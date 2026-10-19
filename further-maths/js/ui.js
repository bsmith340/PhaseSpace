/* UI primitives shared by every view: an SF Symbols-style icon set and a small physics layer
   (springs described by damping ratio + response, momentum projection and rubber-banding). */

// 24×24 line icons drawn with currentColor; stroke weight matches SF Symbols "regular".
const ICONS = (() => {
  const gear = (() => { // 8-tooth gear, generated so the teeth are exactly regular
    const P = (r, a) => `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`, d = Math.PI / 180, R = 9.6, r = 7.2;
    let s = '';
    for (let k = 0; k < 8; k++) {
      const c = k * 45 * d;
      s += `${k ? 'L' : 'M'}${P(r, c - 15 * d)}L${P(R, c - 9 * d)}L${P(R, c + 9 * d)}L${P(r, c + 15 * d)}A${r} ${r} 0 0 1 ${P(r, c + 30 * d)}`;
    }
    return `<path d="${s}Z"/><circle cx="12" cy="12" r="3"/>`;
  })();
  return {
    overview: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
    book: '<path d="M12 6.6C10.2 5.2 7.8 4.5 4 4.5v14c3.8 0 6.2.7 8 2.1 1.8-1.4 4.2-2.1 8-2.1v-14c-3.8 0-6.2.7-8 2.1z"/><path d="M12 6.6v14"/>',
    drill: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
    lab: '<path d="M9.3 3.5h5.4M10 3.5v5.4L4.9 17.4A2.1 2.1 0 0 0 6.7 20.5h10.6a2.1 2.1 0 0 0 1.8-3.1L14 8.9V3.5"/><path d="M7.4 14.5h9.2"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="3.2"/><path d="M8.5 7.5h7"/><path d="M8.6 12h.01M12 12h.01M15.4 12h.01M8.6 16.2h.01M12 16.2h.01M15.4 16.2h.01" stroke-width="2.6"/>',
    gear,
    sims: '<path d="M2.5 12c2.1-6.3 4.2-6.3 6.3 0s4.2 6.3 6.3 0 4.2-6.3 6.4 0"/>',
    theme: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor"/>',
    spec: '<path d="M9.5 6.5h10.5M9.5 12h10.5M9.5 17.5h10.5"/><path d="M4.6 6.5h.01M4.6 12h.01M4.6 17.5h.01" stroke-width="2.8"/>',
    sigma: '<path d="M17.5 5H6.5l6 7-6 7h11"/>',
    papers: '<path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"/><path d="M14 3.5V8h4.5M8.6 12.5h6.8M8.6 16h4.6"/>',
    progress: '<path d="M5 20v-5.5M10 20V9.5M15 20v-8M20 20V4.5"/>',
    sprint: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.6M9.8 2.8h4.4M17.8 7l1.5-1.5"/>',
    graph: '<path d="M4 3.5v17h16.5"/><path d="M7 16.5c2.6-7.5 5.2-7.5 7.4-2.6 1.6 3.4 3 2.6 5.1-4.4"/>',
    summary: '<path d="M13.2 2.8 5.2 13.4h6.1l-1 7.8 8.1-10.7h-6.1z"/>',
    arrow: '<path d="M5 12h14M13.2 6.2 19 12l-5.8 5.8"/>',
    chevron: '<path d="M9 5.5l6.5 6.5L9 18.5"/>',
    down: '<path d="M12 4v11M7.4 10.6 12 15.2l4.6-4.6M5 19.5h14"/>',
    up: '<path d="M12 15.5V4.6M7.4 9 12 4.4 16.6 9M5 19.5h14"/>',
    print: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2.2"/><path d="M7 14h10v6.5H7z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.6l4.5 4.4L19 7.5"/>',
    close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    link: '<path d="M10.2 13.8a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M13.8 10.2a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    archive: '<rect x="3.5" y="4" width="17" height="4.6" rx="1.4"/><path d="M5 8.6v9.9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.6M10 12.6h4"/>',
    expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
    chat: '<path d="M12 4.5c4.7 0 8.5 3 8.5 6.8s-3.8 6.8-8.5 6.8c-.9 0-1.8-.1-2.6-.3L5 19.5l1-3.4c-1.6-1.2-2.5-2.9-2.5-4.8C3.5 7.5 7.3 4.5 12 4.5z"/>',
  };
})();
const ico = (name, cls = '') => `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

/* ---------- motion ---------- */
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Spring in Apple's terms: damping ratio ζ (1 = no overshoot) and response (seconds, ≈ period of the undamped
// oscillation). With unit mass: stiffness k = (2π/response)², damping c = 4πζ/response. It always starts from the
// current on-screen value and keeps its velocity when re-targeted, so it can be interrupted and reversed at any time.
function Spring(onFrame, { value = 0, eps = 0.001 } = {}) {
  let x = value, v = 0, target = value, k = 0, c = 0, raf = 0, last = 0, done = null;
  const step = now => {
    const dt = Math.min(0.034, last ? (now - last) / 1000 : 1 / 60); last = now;
    for (let i = 0, h = dt / 8; i < 8; i++) { v += (-k * (x - target) - c * v) * h; x += v * h; } // semi-implicit Euler
    if (Math.abs(x - target) < eps && Math.abs(v) < eps * 10) { x = target; v = 0; raf = 0; onFrame(x); const d = done; done = null; d && d(); return; }
    onFrame(x); raf = requestAnimationFrame(step);
  };
  return {
    get value() { return x; }, get target() { return target; }, get moving() { return !!raf; },
    // jump with no animation (used while a finger is tracking the element 1:1)
    set(val) { if (raf) cancelAnimationFrame(raf); raf = 0; x = target = val; v = 0; onFrame(x); },
    stop() { if (raf) cancelAnimationFrame(raf); raf = 0; done = null; return x; },
    to(t, { damping = 1, response = 0.35, velocity, onDone } = {}) {
      target = t; if (velocity !== undefined) v = velocity;
      k = (2 * Math.PI / response) ** 2; c = 4 * Math.PI * damping / response; done = onDone || null;
      if (reducedMotion()) { this.set(t); const d = done; done = null; d && d(); return; }
      if (!raf) { last = 0; raf = requestAnimationFrame(step); }
    },
  };
}
// Where a flick would come to rest under scroll-style deceleration (Apple's projection function).
const project = (velocity, rate = 0.998) => (velocity / 1000) * rate / (1 - rate);
// Progressive resistance past a boundary instead of a hard stop.
const rubberband = (over, dim, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
// Velocity (units/s) from the last ~100 ms of pointer samples.
function velocityOf(samples) {
  const now = samples[samples.length - 1]; if (!now) return 0;
  let i = samples.length - 1; while (i > 0 && now.t - samples[i - 1].t < 100) i--;
  const a = samples[i === samples.length - 1 ? Math.max(0, i - 1) : i], dt = (now.t - a.t) / 1000;
  return dt > 0 ? (now.y - a.y) / dt : 0;
}

// iOS Safari only applies :active while a touchstart listener exists — feedback must land on press, not release.
document.addEventListener('touchstart', () => { }, { passive: true });
