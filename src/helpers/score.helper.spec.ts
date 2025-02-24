import {  getGameScoreAsDeuceOrAdvantage, getPlayerScoreAsTennisValue } from "./score.helper";
import { PLAYERS } from "../constants/player.constant";

import type { MatchState } from "../types/match.type";

describe("getGameScoreAsDeuceOrAdvantage", () => {
  it("should return 'Deuce' when scores are equal", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 4 } } as MatchState;
    expect(getGameScoreAsDeuceOrAdvantage(matchState)).toBe("Deuce");
  });

  it("should return 'Advantage player 1' when Player 1 has a higher score", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 5, [PLAYERS.PLAYER_2]: 4 } } as MatchState;
    expect(getGameScoreAsDeuceOrAdvantage(matchState)).toBe("Advantage player 1");
  });

  it("should return 'Advantage player 2' when Player 2 has a higher score", () => {
    const matchState: MatchState = { gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 5 } } as MatchState;
    expect(getGameScoreAsDeuceOrAdvantage(matchState)).toBe("Advantage player 2");
  });
});

describe("getPlayerScoreAsTennisValue", () => {
  it("should return '0' for score 0", () => {
    expect(getPlayerScoreAsTennisValue(0)).toBe("0");
  });

  it("should return '15' for score 1", () => {
    expect(getPlayerScoreAsTennisValue(1)).toBe("15");
  });

  it("should return '30' for score 2", () => {
    expect(getPlayerScoreAsTennisValue(2)).toBe("30");
  });

  it("should return '40' for score 3", () => {
    expect(getPlayerScoreAsTennisValue(3)).toBe("40");
  });

  it("should throw an error for unexpected values", () => {
    expect(() => getPlayerScoreAsTennisValue(4)).toThrow(
      "Unexpected value when transforming player score: 4 to tennis value"
    );
  });
});
