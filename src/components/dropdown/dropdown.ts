import { iCounter, iClearebleCounter, fabricEventListenersForCounters } from './dropdown__counter'
import { iDestructible, iExtendDOMElement } from '../global_mixins/global_mixins'
export { iDestructible, iDropdown }

interface iDropdown extends iExtendDOMElement{
  output: HTMLInputElement;
  counters: iClearebleCounter[];
  resetButton: HTMLInputElement | HTMLButtonElement | null;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];

export class Dropdown implements iDestructible, iExtendDOMElement, iDropdown {
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

  selfElement: HTMLElement;
  output: HTMLInputElement;
  counters: iClearebleCounter[];
  resetButton: HTMLInputElement | HTMLButtonElement | null;

  constructor(element: Element) {
    if (Dropdown.checkElement(element).length >= 1)
      throw new Error(
        'not valid element. please use Dropdown.checkElement(element[, true]) before create this class');

    this.selfElement = element as HTMLElement;
    this.output = element.querySelector('.dropdown__field') as HTMLInputElement;
    this.resetButton = element.querySelector('.dropdown__button_reset');

    const staticCounters: iCounter[] = Array.from(element.querySelectorAll('.dropdown__counter'), counter => {
      const title = counter.querySelector('.dropdown__counter_title')!.textContent!;
      return {
        text: function () {
          const value = parseFloat(this.iterator.value);
          if (isNaN(value))
            return ''
          const min = parseFloat(this.iterator.min);
          if (isNaN(min) || min < value)
            return `${value} ${title}`
          else
            return ''
        },
        self: counter,
        iterator: counter.querySelector('.dropdown__iterator') as HTMLInputElement,
        incrementButton: counter.querySelector('.dropdown__inc') as HTMLButtonElement,
        decrementButton: counter.querySelector('.dropdown__dec') as HTMLButtonElement,
      }
    });
    this.counters = fabricEventListenersForCounters(staticCounters);
    this.selfElement.addEventListener('click', this.bindedSetFieldText, { passive: true });
    this.selfElement.addEventListener('reset', this.bindedReset, { passive: true });
  }
  private readonly bindedSetFieldText = (function(this: Dropdown, event: MouseEvent) {
    if (!(event.target as Element).classList.contains('dropdown__iterator_button')) return;
    const counterTexts = this.counters
      .map(counter => counter.text())
      .filter(text => (text.length >= 1));
    let result = '';
    if (counterTexts.length >= 1) {
      const MAX_COUNTER_TEXTS = 2;
      let i = 0;
      result = counterTexts[i++];
      for (const N = Math.min(counterTexts.length, MAX_COUNTER_TEXTS); i < N; i++){
        result += `, ${counterTexts[i]}`;
      }
      if (counterTexts.length > MAX_COUNTER_TEXTS) {
        const OVER_COUNTERS_MARKER = '...'
        result += OVER_COUNTERS_MARKER;
      }
    }
    setTimeout((output: HTMLInputElement, result: string, resetButton: HTMLInputElement | HTMLButtonElement | null) => {
      output.value = result;
      if (resetButton)
        if (result.length >= 1)
          resetButton.classList.remove('dropdown__button_reset-hidden');
        else
          resetButton.classList.add('dropdown__button_reset-hidden');
    }, 0, this.output, result, this.resetButton);
  }).bind(this);

  private readonly bindedReset = (function (this: Dropdown, event: Event) {
    setTimeout((counters: iCounter[], resetButton: HTMLInputElement | HTMLButtonElement | null) => {
      if (resetButton)
        resetButton.classList.add('dropdown__button_reset-hidden');
      for (let counter of counters.values()) {
        const value = +counter.iterator.value;
        if (value <= +counter.iterator.min) {
          counter.decrementButton.disabled = true;
        }
        if (value >= parseFloat(counter.iterator.max)) {
          counter.incrementButton.disabled = true;
        }
      }
    }, 0, this.counters, this.resetButton);
  }).bind(this);

  destroy() {
    this.selfElement.removeEventListener('click', this.bindedSetFieldText);
    this.selfElement.removeEventListener('reset', this.bindedReset);
    this.counters.forEach(counter => counter.removeEventListeners());
  }
}

document.querySelectorAll('.dropdown').forEach(element => {
  if (Dropdown.checkElement(element).length <= 0)
    (element as any).MyDropdown = new Dropdown(element)
})
