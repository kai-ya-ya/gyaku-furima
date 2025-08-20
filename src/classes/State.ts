import { PlayerState } from "./PlayerState";
import { GameState } from "./GameState";

export class State {
  player: PlayerState
  game: GameState

  constructor(player: PlayerState, game: GameState) {
    this.player = player;
    this.game = game;
  }
}
