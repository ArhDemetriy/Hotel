export { iDestructible, iComment }

interface iDestructible {
  destroy(): void;
}
interface iComment {
  action(): void;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];

export class Comment implements iDestructible, iComment {
  selfElement: Element;
  active: Element;

  private readonly bindedAction = this.action.bind(this);
  constructor(element: Element) {
    let temp = element.querySelector('.comment__active');
    if (!temp) throw new ReferenceError(
      `not elem ".comment__active" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.active = temp;

    this.selfElement = element;

    this.active.addEventListener('click', this.bindedAction);
  }
  action(){}
  destroy() {
    this.active.removeEventListener('click', this.bindedAction);
  }
}