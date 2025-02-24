import type { Player } from "./player.type";

export interface MatchState {
  gameScore: { [key in Player]: number };
  setScore: { [key in Player]: number };
  winner?: Player;
}