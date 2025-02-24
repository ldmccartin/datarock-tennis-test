
import { pointWonBy, getCurrentScore } from "./match";
import { PLAYERS } from "../constants/player.constant";
import type { MatchState } from "../types/match.type";


describe("pointWonBy", () => {
  describe('given there is already a winner', () => {
    it("should return the match state as-is without modification", () => {
      const matchState: MatchState = {
        gameScore: { "Player 1": 3, "Player 2": 3 },
        setScore: { "Player 1": 7, "Player 2": 5 },
        winner: "Player 1"
      };
  
      expect(pointWonBy(matchState, PLAYERS.PLAYER_2)).toEqual(matchState);
    });
  });
  
  describe('given a player wins a game point', () => {
    describe('when game point does NOT win the set', () => {
      const matchState: MatchState = {
        gameScore: { "Player 1": 2, "Player 2": 2 },
        setScore: { "Player 1": 4, "Player 2": 4 },
      };
  
      const result = pointWonBy(matchState, PLAYERS.PLAYER_1);

      it("should increment the player's game score", () => {
        expect(result.gameScore[PLAYERS.PLAYER_1]).toEqual(3);
      });

      it("should NOT increment either player's set score", () => {
        expect(result.setScore).toEqual(matchState.setScore);
      });

      it("should NOT increment the other player's game score", () => {
        expect(result.gameScore[PLAYERS.PLAYER_2]).toEqual(2);
      });
    });

    describe('when game point does win the set', () => {
      const matchState: MatchState = {
        gameScore: { "Player 1": 3, "Player 2": 2 },
        setScore: { "Player 1": 4, "Player 2": 4 },
      };
  
      const result = pointWonBy(matchState, PLAYERS.PLAYER_1);

      it("should reset the player's game score", () => {
        expect(result.gameScore[PLAYERS.PLAYER_1]).toEqual(0);
      });

      it("should increment the player's set score", () => {
        expect(result.setScore[PLAYERS.PLAYER_1]).toEqual(5);
      });

      it("should NOT increment the other player's set score", () => {
        expect(result.setScore[PLAYERS.PLAYER_2]).toEqual(4);
      });

      it("should reset the other player's game score", () => {
        expect(result.gameScore[PLAYERS.PLAYER_2]).toEqual(0);
      });
    });

    describe('when game point does win the set and match', () => {
      const matchState: MatchState = {
        gameScore: { "Player 1": 3, "Player 2": 2 },
        setScore: { "Player 1": 5, "Player 2": 4 },
      };
  
      const result = pointWonBy(matchState, PLAYERS.PLAYER_1);

      it("should set the player as winner", () => {
        expect(result.winner).toEqual(PLAYERS.PLAYER_1);
      });
    });
  });
});

describe("getCurrentScore", () => {
  it("should return only the set score when both players' game scores are 0", () => {
    const matchState: MatchState = {
      gameScore: { "Player 1": 0, "Player 2": 0 },
      setScore: { "Player 1": 5, "Player 2": 3 },
    };
    
    const result = getCurrentScore(matchState);
    expect(result).toEqual('"5 - 3"');
  });

  it("should return both set score and game score when game score is not 0-0", () => {
    const matchState: MatchState = {
      gameScore: { "Player 1": 3, "Player 2": 2 },
      setScore: { "Player 1": 5, "Player 2": 4 },
    };

    const result = getCurrentScore(matchState);
    expect(result).toEqual('"5 - 4, 40 - 30"');
  });
});