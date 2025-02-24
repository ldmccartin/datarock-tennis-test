import { isSetWinningPoint, isTieBreaker } from "./set.helper";
import { PLAYERS } from "../constants/player.constant";

import type { MatchState } from "../types/match.type";

describe("isSetWinningPoint", () => {
  it("should return false if both players have less than 6 set points", () => {
    const matchState: MatchState = { setScore: { [PLAYERS.PLAYER_1]: 5, [PLAYERS.PLAYER_2]: 5 } } as MatchState;
    expect(isSetWinningPoint(matchState)).toBe(false);
  });

  it("should return false if the difference is less than 2 even if both players have 6 or more points", () => {
    const matchState: MatchState = { setScore: { [PLAYERS.PLAYER_1]: 6, [PLAYERS.PLAYER_2]: 5 } } as MatchState;
    expect(isSetWinningPoint(matchState)).toBe(false);
  });

  it("should return true one player has 6 set points and the difference is 2 set points or greater", () => {
    const matchState: MatchState = { setScore: { [PLAYERS.PLAYER_1]: 6, [PLAYERS.PLAYER_2]: 4 } } as MatchState;
    expect(isSetWinningPoint(matchState)).toBe(true);
  });

  it("should return true if a player has exactly 7 set points", () => {
    const matchState: MatchState = { setScore: { [PLAYERS.PLAYER_1]: 7, [PLAYERS.PLAYER_2]: 6 } } as MatchState;
    expect(isSetWinningPoint(matchState)).toBe(true);
  });
});

describe("isTieBreaker", () => {
  it("should return true when both players have a set score of 6", () => {
    const matchState = {
      setScore: { [PLAYERS.PLAYER_1]: 6, [PLAYERS.PLAYER_2]: 6 }
    } as MatchState;

    expect(isTieBreaker(matchState)).toBe(true);
  });

  it("should return false when both players DO NOT have a set score of 6", () => {
    const matchState = {
      setScore: { [PLAYERS.PLAYER_1]: 5, [PLAYERS.PLAYER_2]: 6 }
    } as MatchState;

    expect(isTieBreaker(matchState)).toBe(false);
  });
});