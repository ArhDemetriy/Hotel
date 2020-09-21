'use strict'; {
  function summator(event) {
    const elements = event.currentTarget.querySelectorAll(`.counting__iterator`);
    let value = 0;
    elements.forEach(element => value += +element.value);
    const field = event.currentTarget.parentElement.querySelector(`.dropfield__field`);
    field.value = value;
  }

  function resetter(event) {
    if (!event.target.closest('.dropdown__button_reset')) return;
    event.currentTarget.querySelector(`.dropfield__field`).value = 0;
  }

  (function ($) {
    $('.dropfield__drop').on('change', summator);
    $('.dropfield').on('click', resetter);
  })(jQuery);
}