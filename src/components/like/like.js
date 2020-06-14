'use strict';
{
  function handler(event){
    const promise = Promise.all([
      new Promise((resolve, reject) => {
        resolve(
          this.querySelector(`.like__text`))
      }),
      new Promise((resolve, reject) => {
        resolve(
          isFinite(this.likes) ? this.likes : 0)
      }),
      new Promise((resolve, reject) => {
        resolve((
          (this.querySelector(`.like__input`) && this.querySelector(`.like__input`).checked)) ? 1 : 0)
      }),
    ]);
    promise.then(args => { args[0].innerHTML = `${args[1] + args[2]}` });
  }

  const elements = document.querySelectorAll(`.like`);
  elements.forEach((_, i, a) => {
    // click change
    a[i].addEventListener('change', handler, { passive: true, });
  });
}