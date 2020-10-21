export { iDestructible, iDropdown }

interface iDestructible {
  destroy(): void;
}
interface iDropdown {
  action(): void;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];
type tCounter = {
  text: () => string;
  self: Element;
  iterator: HTMLInputElement;
  decrementButton: HTMLButtonElement;
  incrementButton: HTMLButtonElement;
  removeEventListener: () => void;
}

export class Dropdown implements iDestructible, iDropdown {
  static checkElement(element: Element, full = false) {
    const errors: Array<string> = []
    let temp: Element | HTMLInputElement | null = element.querySelector('.dropdown__field');
    if (!temp)
      errors.push(
        `not elem ".dropdown__field". in tag: ${element.tagName} class: ${element.classList.toString}`);
    else if (!('value' in temp))
      errors.push(
        `elem ".dropdown__field" is not text input. in tag: ${element.tagName} class: ${element.classList.toString}`);

    const counters = element.querySelectorAll('.dropdown__counter');
    if (counters.length < 1)
      errors.push(
        `not elems ".dropdown__counter". in tag: ${element.tagName} class: ${element.classList.toString}`);

    if (errors.length >= 1 && !full) return errors;

    for (let counter of counters) {
      let temp: Element | HTMLInputElement | HTMLButtonElement | null  = counter.querySelector('.dropdown__counter_title');
      if (!temp || !temp.textContent) errors.push(
        `not elem ".dropdown__counter_title" or not textContent in him. in tag: ${counter.tagName} class: ${counter.classList.toString}`);
      temp = counter.querySelector('.dropdown__iterator');
      if (!temp)
        errors.push(
          `not elem ".dropdown__iterator. in tag: ${counter.tagName} class: ${counter.classList.toString}`);
      else if (!('value' in temp))
        errors.push(
          `elem ".dropdown__iterator" is not number or text input. in tag: ${counter.tagName} class: ${counter.classList.toString}`);
      temp = counter.querySelector('.dropdown__dec');
      if (!temp) errors.push(
        `not elem ".dropdown__dec". in tag: ${counter.tagName} class: ${counter.classList.toString}`)
      else if (!('disabled' in temp))
        errors.push(
          `elem ".dropdown__dec" is not button or input button. in tag: ${counter.tagName} class: ${counter.classList.toString}`);
      temp = counter.querySelector('.dropdown__inc');
      if (!temp) errors.push(
        `not elem ".dropdown__inc". in tag: ${counter.tagName} class: ${counter.classList.toString}`)
      else if (!('disabled' in temp))
        errors.push(
          `elem ".dropdown__inc" is not button or input button. in tag: ${counter.tagName} class: ${counter.classList.toString}`);
    }

    return errors;
  }

  selfElement: Element;
  output: HTMLInputElement;

  private readonly bindedAction = this.action.bind(this);
  constructor(element: Element) {
    if (Dropdown.checkElement(element).length >= 1)
      throw new Error(
        'not valid element. please use Dropdown.checkElement(element[, true]) before create this class');

    this.selfElement = element;
    this.output = element.querySelector('.dropdown__field') as HTMLInputElement;

    const counters: tCounter[] = Array.from(element.querySelectorAll('.dropdown__counter'), counter => {
      const title = counter.querySelector('.dropdown__counter_title')!.textContent!;
      return {
        text: function () {
          const value = +this.iterator.value;
          const min = +this.iterator.min;
          if (isFinite(value) && isFinite(min) && min < value)
            return `${value} ${title}`
          else
            return ''
        },
        self: counter,
        iterator: counter.querySelector('.dropdown__iterator') as HTMLInputElement,
        decrementButton: counter.querySelector('.dropdown__dec') as HTMLButtonElement,
        incrementButton: counter.querySelector('.dropdown__inc') as HTMLButtonElement,
        removeEventListener: function () { this.self.removeEventListener('click', this.text) },
      }
    });
    // this.active.addEventListener('click', this.bindedAction);
  }
  private fabricEventListenersForCounters(counters: tCounter[]) {
    const getValue = (strValue: string, strMin: string) => {
      const min = isFinite(+strMin) ? +strMin : 0;
      return Math.max(min, isFinite(+strValue) ? +strValue : min);
    }
    const setValue = (iterator: HTMLInputElement, value: string, oppositeButton: HTMLButtonElement) => {
      iterator.value = value;
      if (oppositeButton.disabled)
        oppositeButton.disabled = false;
    }
    function increment(this: tCounter) {
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
    function decrement(this: tCounter) {
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
  }
  action(){}
  destroy() {
    // this.active.removeEventListener('click', this.bindedAction);
  }
}
