'use strict';
{
  function handler(event){
    const likesDOM = this.querySelector(`.like__text`);
    if (!likesDOM) return;
    let likes = Number(this.dataset.count);
    if (!isFinite(likes)) likes = 0;
    likes += this.querySelector(`.like__input`) && this.querySelector(`.like__input`).checked ? 1 : 0;
    likesDOM.textContent = `${likes}`;
  }

  const elements = document.querySelectorAll(`.like`);
  elements.forEach((_, i, a) => {
    // click change
    a[i].addEventListener('change', handler, { passive: true, });
  });
}