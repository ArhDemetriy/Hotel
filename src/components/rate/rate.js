`use strict`;
{
  const f = function (rate) {
    const maxRate = 5;
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

  const elements = document.querySelectorAll(`.rate`);
  elements.forEach((_, i, a) => {
    a[i].setRate = f;
  });
}
