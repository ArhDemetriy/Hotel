export { iDestructible, iExtendDOMElement, isTrulyFinite }

interface iDestructible {
  destroy(): void;
}
interface iExtendDOMElement {
  selfElement: HTMLElement;
}
function isTrulyFinite(value: any): boolean {
  if (value != 0)
    return isFinite(value);
  if (value === 0)
    return true;
  if (!value || !('length' in value) || value.length <= 0)
    return false;
  return isFinite(parseFloat(value));
}
