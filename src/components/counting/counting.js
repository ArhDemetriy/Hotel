'use strict'; {
  function changingValue(event) {
    const shiftValue = (() => {
      if (event.target.matches('.counting__inc:not(:disabled)'))
        return 1
      else if (event.target.matches('.counting__dec:not(:disabled)'))
        return -1
      else
        return 0
    })();
    if (shiftValue == 0) return;
    const
      iterator = this.querySelector('.counting__iterator'),
      iteratorValue = iterator.value;

    let newValue = 0;
    if (isFinite(iteratorValue))
      newValue = Number(iteratorValue);
    newValue += shiftValue;
    if (newValue < 0) // проверка нужна на случай невалидных данных и клике по .counting__dec:not(:disabled)
      newValue = 0;

    this.querySelector('.counting__dec').disabled = (newValue < 1);

    iterator.value = newValue;
    // iterator.input();
  }
  function settingButtonStage(event) {
    if (!event.target.matches('.counting__iterator')) return;
    const value = event.target.value;
    if (!value) return;
    this.querySelector('.counting__dec').disabled = (value < 1);

    event.target.value = value * 1;
  }

  const elements = document.querySelectorAll(`.counting`);
  elements.forEach((_, i, a) => {
    a[i].addEventListener('click', changingValue, { passive: true, });
    a[i].addEventListener('change', settingButtonStage, { passive: true, });
  });
}