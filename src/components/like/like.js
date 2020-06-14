'use strict';
{


  const handler = (event) => {
    event = event || window.event;
    if (!event || !event.currentTarget) return;
    let likes = (event.currentTarget.likes && isFinite(event.currentTarget.likes)) ? event.currentTarget.likes : 0
    if (event.currentTarget.querySelector(`.like__input`) && event.currentTarget.querySelector(`.like__input`).checked) likes++;
    alert(likes);
    const t = event.currentTarget.querySelector(`.like__text`);
    t.style.setProperty(`--likes`, '7');
    const p = t.style.getPropertyValue(`--likes`);
    alert(`${p} : `+`${typeof(p)}`);
  }

  const elements = document.querySelectorAll(`.like`);
  elements.forEach((_, i, a) => {
    // click change
    a[i].addEventListener('change', handler, { passive: true, });
  });

}