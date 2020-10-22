export { iCounter, iClearebleCounter, fabricEventListenersForCounters }

interface iCounter {
  text: () => string;
  self: Element;
  iterator: HTMLInputElement;
  decrementButton: HTMLButtonElement;
  incrementButton: HTMLButtonElement;
}
interface iClearebleCounter extends iCounter {
  removeEventListeners: (this: iCounter) => void;
}

function fabricEventListenersForCounters(counters: iCounter[]) {
    const getValue = (strValue: string, strMin: string) => {
      const min = isFinite(+strMin) ? +strMin : 0;
      return Math.max(min, isFinite(+strValue) ? +strValue : min);
    }
    const setValue = (iterator: HTMLInputElement, value: string, oppositeButton: HTMLButtonElement) => {
      iterator.value = value;
      if (oppositeButton.disabled)
        oppositeButton.disabled = false;
    }
    function increment(this: iCounter) {
      const value = getValue(this.iterator.value, this.iterator.min);
      const max = isFinite(+this.iterator.max) ? +this.iterator.max : Infinity;
      if (value < max - 1)
        setTimeout(setValue, 0, this.iterator, String(value + 1), this.decrementButton)
      else {
        this.incrementButton.disabled = true;
        if (value != max)
          setTimeout(setValue, 0, this.iterator, String(max), this.decrementButton)
      }
    }
    function decrement(this: iCounter) {
      const value = getValue(this.iterator.value, this.iterator.min);
      const min = isFinite(+this.iterator.min) ? +this.iterator.min : 0;
      if (value > min + 1)
        setTimeout(setValue, 0, this.iterator, String(value - 1), this.incrementButton)
      else {
        this.decrementButton.disabled = true;
        if (value != min)
          setTimeout(setValue, 0, this.iterator, String(min), this.incrementButton)
      }
    }
    return counters.map(counter => {
      const bindedIncrement = increment.bind(counter);
      const bindedDecrement = decrement.bind(counter);
      const clearebleCounter: iClearebleCounter = Object.assign(counter, {
        removeEventListeners: function (this: iCounter) {
          this.incrementButton.removeEventListener('click', bindedIncrement);
          this.decrementButton.removeEventListener('click', bindedDecrement);
        }
      })
      clearebleCounter.incrementButton.addEventListener('click', bindedIncrement, { passive: true });
      clearebleCounter.decrementButton.addEventListener('click', bindedDecrement, { passive: true });
      return clearebleCounter;
    });
  }
