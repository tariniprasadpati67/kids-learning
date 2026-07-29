/**
 * Odia Medium Learning Games - Service Worker & PWA Registration
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('[PWA] ServiceWorker registered with scope:', reg.scope);
      })
      .catch(err => {
        console.warn('[PWA] ServiceWorker registration failed:', err);
      });
  });
}
