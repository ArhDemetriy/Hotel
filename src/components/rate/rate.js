`use strict`;
{
  const MAX_RATE = 5;
  const f = function (rate) {
    const maxRate = MAX_RATE;
    if (!isFinite(rate) || rate < 0 || rate > maxRate || !this || !this.style) { return; }

    //вожусь с генерацией промисов, потому-что в будущем нужно будет вешать промис отправки на сервер выставленного рейтинга
    const a = Array(maxRate + 1);
    for (let i = 0; i <= maxRate; a[i++] = `unset`) { }
    a[rate] = `inline-block`;
    for (let i = 0; i <= maxRate; i++) {
      a[i] = new Promise(resolve => this.style.setProperty(`--rate-${i}`, a[i]))
    }
    Promise.all(a).then();
  }
  const rate = 'rate';
  const elements = document.querySelectorAll(`.${rate}`);
  elements.forEach((_, i, a) => {
    a[i].setRate = f;
    a[i].addEventListener('mouseover', (event) => {
      const classList = event.target.classList;
      if (!classList || !classList.contains(`${rate}__star`)) { return; }

      for (let i = 0; i < MAX_RATE; i++) {
        if (classList.contains(`${rate}__star_pos-${i}`) || classList.contains(`${rate}__star_neg-${i-1}`)) {
          event.currentTarget.setRate(i);
          return;
         }
      }


    });
  });
}
