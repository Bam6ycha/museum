import { ChildElement } from "./childElement_Type";

export const insert = {
  append(childElement: ChildElement) {
    this.append(childElement);
  },
  prepend(childElement: ChildElement) {
    this.prepend(childElement);
  },
  after(childElement: ChildElement) {
    this.after(childElement);
  },
  before(childElement: ChildElement) {
    this.before(childElement);
  },
};
