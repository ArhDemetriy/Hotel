export { iDestructible, iDropdown }

interface iDestructible {
  destroy(): void;
}
interface iDropdown {
  action(): void;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];

export class Dropdown implements iDestructible, iDropdown {
  selfElement: Element;
  active: Element;

  private readonly bindedAction = this.action.bind(this);
  constructor(element: Element) {
    let temp = element.querySelector('.dropdown__active');
    if (!temp) throw new ReferenceError(
      `not elem ".dropdown__active" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.active = temp;

    this.selfElement = element;

    this.active.addEventListener('click', this.bindedAction);
  }
  action(){}
  destroy() {
    this.active.removeEventListener('click', this.bindedAction);
  }
}
