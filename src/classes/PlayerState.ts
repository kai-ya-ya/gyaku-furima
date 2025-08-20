import { Fragment } from "./Fragment";

export class PlayerState {
  public id: string = null;
  public name: string = null;
  public fragments: [Fragment];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
