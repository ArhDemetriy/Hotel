import { isTrulyFinite } from '../global_mixins/global_mixins'
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
      setTimeout((oppositeButton: HTMLButtonElement) => {
        if (oppositeButton.disabled)
          oppositeButton.disabled = false;
       }, 0, oppositeButton);
    }
    function increment(this: iCounter) {
      const value = getValue(this.iterator.value, this.iterator.min);
      const max = this.iterator.max && isFinite(+this.iterator.max) ? +this.iterator.max : Infinity;
      if (value < max - 1)
        setValue(this.iterator, String(value + 1), this.decrementButton)
      else {
        this.incrementButton.disabled = true;
        if (value != max)
          setValue(this.iterator, String(max), this.decrementButton)
      }
    }
    function decrement(this: iCounter) {
      const value = getValue(this.iterator.value, this.iterator.min);
      const min = this.iterator.min && isFinite(+this.iterator.min) ? +this.iterator.min : 0;
      if (value > min + 1)
        setValue(this.iterator, String(value - 1), this.incrementButton)
      else {
        this.decrementButton.disabled = true;
        if (value != min)
          setValue(this.iterator, String(min), this.incrementButton)
      }
    }
    return counters.map(counter => {
      const clearebleCounter: iClearebleCounter = Object.assign(counter);
      const bindedIncrement = increment.bind(clearebleCounter);
      const bindedDecrement = decrement.bind(clearebleCounter);
      clearebleCounter.removeEventListeners = function (this: iCounter) {
          this.incrementButton.removeEventListener('click', bindedIncrement);
          this.decrementButton.removeEventListener('click', bindedDecrement);
        }
      clearebleCounter.incrementButton.addEventListener('click', bindedIncrement, { passive: true });
      clearebleCounter.decrementButton.addEventListener('click', bindedDecrement, { passive: true });
      return clearebleCounter;
    });
}
