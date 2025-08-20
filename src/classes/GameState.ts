import { Fragment } from "./Fragment";
import { Location } from "./Location";

export enum doubleDiamond {
  DISCOVER,
  DEFINE,
  DEVELOP,
  DELIVER,
}

export class GameState {
  public id: string;
  public day: number;
  public hour: number;
  public location: Location;
  public progress: doubleDiamond;

  constructor(id: string, location: Location, progress: doubleDiamond) {
    this.id = id;
    this.location = location;
    this.progress = progress;
  }
}
