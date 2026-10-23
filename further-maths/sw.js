/* BCS Academy service worker.
 * - Offline-first app shell: on install it reads index.html and caches every local
 *   file it references (css/js/assets), plus the manifest and icons.
 * - Local files: stale-while-revalidate (fast from cache, refreshed in the background).
 * - /api/* and Supabase: network only, never cached.
 * - cdnjs (KaTeX css/js/fonts) and Google Fonts: cached on first use (URLs are versioned).
 * - Updates: a new worker waits until the page posts {type:'SKIP_WAITING'}, so the
 *   page can show "Update available" and reload when the student chooses.
 * Bump VERSION whenever you deploy to force a fresh shell download. */
const VERSION = 'v1';
const SHELL = 'bcs-shell-' + VERSION;
const CDN = 'bcs-cdn-v1';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './assets/favicon.svg', './assets/logo.svg', './assets/logo-mono.svg',
  './assets/icon-32.png', './assets/icon-192.png', './assets/icon-512.png',
  './assets/icon-maskable-512.png', './assets/apple-touch-icon.png'
];
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

// Every local src/href in index.html (skips absolute URLs, data:, mailto:, #routes).
function localRefs(html) {
  const out = new Set();
  const re = /\b(?:src|href)\s*=\s*["']([^"'#]+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const u = m[1].trim();
    if (!u || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u)) continue;
    out.add(u.startsWith('./') || u.startsWith('/') ? u : './' + u);
  }
  return [...out];
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    let refs = [];
    try {
      const res = await fetch('./index.html', { cache: 'reload' });
      if (res.ok) {
        refs = localRefs(await res.clone().text());
        await cache.put('./index.html', res.clone());
        await cache.put('./', res);
      }
    } catch (e) { /* offline install: CORE only */ }
    const list = [...new Set([...CORE, ...refs])].filter((u) => u !== './' && u !== './index.html');
    // One missing file must not abort the whole install.
    await Promise.allSettled(list.map(async (u) => {
      const res = await fetch(u, { cache: 'reload' });
      if (res.ok) await cache.put(u, res);
    }));
    // No skipWaiting() here: the page decides when to switch (see message handler).
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('bcs-') && k !== SHELL && k !== CDN).map((k) => caches.delete(k)));
    if (self.registration.navigationPreload) { try { await self.registration.navigationPreload.disable(); } catch (e) {} }
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  const d = event.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  else if (d.type === 'GET_VERSION' && event.ports && event.ports[0]) event.ports[0].postMessage({ version: VERSION });
});

function isNetworkOnly(url) {
  return (url.origin === self.location.origin && /\/api\//.test(url.pathname)) ||
    /(^|\.)supabase\.(co|in|com|net)$/.test(url.hostname) || url.hostname.includes('supabase');
}

async function staleWhileRevalidate(event, req, cacheKey) {
  const cache = await caches.open(SHELL);
  const cached = await cache.match(cacheKey || req, { ignoreSearch: true });
  const network = fetch(req).then(async (res) => {
    if (res && res.ok && res.type === 'basic') await cache.put(cacheKey || req, res.clone());
    return res;
  }).catch(() => null);
  if (cached) { event.waitUntil(network); return cached; }
  const res = await network;
  if (res) return res;
  if (req.mode === 'navigate') {
    const shell = await cache.match('./index.html');
    if (shell) return shell;
  }
  return new Response('Offline', { status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' } });
}

async function cacheFirst(req) {
  const cache = await caches.open(CDN);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  // Opaque (no-cors) responses are fine for versioned CDN files.
  if (res && (res.ok || res.type === 'opaque')) await cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (isNetworkOnly(url)) return; // browser handles it: network only
  if (url.origin === self.location.origin) {
    // Every navigation inside scope is the single-page shell (routes live in the #hash).
    const key = req.mode === 'navigate' && (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) ? './index.html' : undefined;
    event.respondWith(staleWhileRevalidate(event, req, key));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) event.respondWith(cacheFirst(req));
});
