import { iCounter, iClearebleCounter, fabricEventListenersForCounters } from './dropdown__counter'
export { iDestructible, iDropdown }

interface iDestructible {
  destroy(): void;
}
interface iDropdown {
  action(): void;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];

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
  counters: iClearebleCounter[];


  // private readonly bindedSetFieldText = this.setFieldText.bind(this);
  constructor(element: Element) {
    if (Dropdown.checkElement(element).length >= 1)
      throw new Error(
        'not valid element. please use Dropdown.checkElement(element[, true]) before create this class');

    this.selfElement = element;
    this.output = element.querySelector('.dropdown__field') as HTMLInputElement;

    const counters: iCounter[] = Array.from(element.querySelectorAll('.dropdown__counter'), counter => {
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
        incrementButton: counter.querySelector('.dropdown__inc') as HTMLButtonElement,
        decrementButton: counter.querySelector('.dropdown__dec') as HTMLButtonElement,
      }
    });
    this.counters = fabricEventListenersForCounters(counters);
    (this.selfElement as HTMLElement).addEventListener('click', this.bindedSetFieldText, { passive: true });

  }
  private readonly bindedSetFieldText = (function(event: MouseEvent) {
    // if (!(event.target as Element).classList.contains('dropdown__iterator_button')) return;
    console.log('onChange')
  }).bind(this);
  action(){}
  destroy() {
    // this.active.removeEventListener('click', this.bindedAction);
  }
}

document.querySelectorAll('.dropdown').forEach(element => {
  if (Dropdown.checkElement(element).length <= 0)
    (element as any).MyDropdown = new Dropdown(element)
})
