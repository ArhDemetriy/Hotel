'use strict'; {
  function handler(event) {

    const shiftValue = (() => {
      if (event.target.matches('.counting__inc'))
        return 1
      else if (event.target.matches('.counting__dec:not(.counting__button-deactive)'))
        return -1
      else
        return 0
    })();
    if (shiftValue == 0) return;
    const
      iterator = this.querySelector('.counting__iterator'),
      iteratorValue = iterator.textContent,
      countValue = this.dataset.count;

    let newValue = 0;
    if (isFinite(countValue))
      newValue = Number(countValue)
    else if (isFinite(iteratorValue))
      newValue = Number(iteratorValue);
    newValue += shiftValue;
    if (newValue < 0) // проверка нужна на случай невалидных данных и клике по .counting__dec:not(.counting__button-deactive)
      newValue = 0;

    if (newValue == 0)
      this.querySelector('.counting__dec').classList.add("counting__button-deactive")
    else if (newValue == 1)
      this.querySelector('.counting__dec').classList.remove("counting__button-deactive")

    iterator.textContent = this.dataset.count = newValue;
  }

  const elements = document.querySelectorAll(`.counting`);
  elements.forEach((_, i, a) => {
    a[i].addEventListener('click', handler, { passive: true, });
  });
}