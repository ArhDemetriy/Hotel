'use strict';
window.sessionStorage.afterloadDOM = (f,css=false) => {
  if (!f || typeof (f) != 'function') return;

  if (!css && document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', f, {
      once: true,
      passive: true,
    });
  }
  else if (css && document.readyState != 'complete') {
    document.addEventListener('onload', f, {
      once: true,
      passive: true,
    });
  } else {
    f();
  }
}