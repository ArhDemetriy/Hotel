'use strict'; {
  function setModVisible(event) {
    this.classList.add('dropdown-visible');
  };
  function unsetModVisible(event) {
    this.classList.remove('dropdown-visible');
  };

  const elements = document.querySelectorAll(`.dropdown`);
  elements.forEach((_, i, a) => {
    a[i].addEventListener('focusin', setModVisible, { passive: true, });
    a[i].addEventListener('focusout', unsetModVisible, { passive: true, });
  });
}