'use strict'; {
  function handler(event) {
    const elements = event.currentTarget.querySelectorAll(`.counting__iterator`);
    let value = 0;
    elements.forEach(element => value += +element.value);
    const field = event.currentTarget.parentElement.querySelector(`.dropfield__field`);
    field.value = value;
  };
  function handler1(event) {
    if (event.target.matches('.counting__inc') || event.target.matches('.counting__dec'))
      handler(event);
  }
  // input change click
  const elements = document.querySelectorAll(`.dropfield__drop`);
  elements.forEach((_, i, a) => {
    a[i].addEventListener('input', handler, { passive: true, });
    a[i].addEventListener('click', handler1, { passive: true, });
  });
}