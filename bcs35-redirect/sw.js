// Replaces the old Phase Space service worker: browsers that installed the app pick this up on their next visit,
// it clears the old offline copy and steps aside, so they see the "moved to BcsMaths" page instead of a stale site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
