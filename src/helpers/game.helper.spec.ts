import { isGameWinningPoint } from "./game.helper";
import { PLAYERS } from "../constants/player.constant";

import type { MatchState } from "../types/match.type";

describe("isGameWinningPoint", () => {
  it("should return false if both players have less than 4 game points", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 3, [PLAYERS.PLAYER_2]: 3 } } as MatchState;
    expect(isGameWinningPoint(matchState)).toBe(false);
  });

  it("should return true if one player has 4 or more game points and the difference is 2 or more", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 5, [PLAYERS.PLAYER_2]: 3 } } as MatchState;
    expect(isGameWinningPoint(matchState)).toBe(true);
  });

  it("should return false if the difference is less than 2 even if both players have 4 or more game points", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 5 } } as MatchState;
    expect(isGameWinningPoint(matchState)).toBe(false);
  });
});
