import { isGameWinningPoint, formatGameScore } from "./game.helper";
import { PLAYERS } from "../constants/player.constant";

import type { MatchState } from "../types/match.type";

const nonTieBreakerSet = { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 5 };
const tieBreakerSet = { [PLAYERS.PLAYER_1]: 6, [PLAYERS.PLAYER_2]: 6 };

describe("isGameWinningPoint", () => {
  describe('When set is NOT a tie breaker', () => {
    it("should return false if both players have less than 4 game points", () => {
      const matchState: MatchState = { 
        gameScore: { [PLAYERS.PLAYER_1]: 3, [PLAYERS.PLAYER_2]: 3 },
        setScore: nonTieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(false);
    });
  
    it("should return true if one player has 4 or more game points and the difference is 2 or more", () => {
      const matchState: MatchState = { 
        gameScore: { [PLAYERS.PLAYER_1]: 5, [PLAYERS.PLAYER_2]: 3 },
        setScore: nonTieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(true);
    });
  
    it("should return false if the difference is less than 2 even if both players have 4 or more game points", () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 5 },
        setScore: nonTieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(false);
    });
  }); 

  describe('When set is a tie breaker', () => {
    it("should return false if neither player has 7 points", () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 5 },
        setScore: tieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(false);
    });
  
    it("should return false if a player has 7 points but the difference is not 2 points", () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 7, [PLAYERS.PLAYER_2]: 6 },
        setScore: tieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(false);
    });
  
    it("should return true if a player has 7 points and the difference is 2 points", () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 7, [PLAYERS.PLAYER_2]: 5 },
        setScore: tieBreakerSet
      } as MatchState;
  
      expect(isGameWinningPoint(matchState)).toBe(true);
    });
  })
});

describe('formatGameScore', () => {
  describe('When set is a tie breaker', () => {
    it('should return tie-break score if match is in tie-break mode', () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 7, [PLAYERS.PLAYER_2]: 5 },
        setScore: tieBreakerSet
      } as MatchState;
  
      expect(formatGameScore(matchState)).toBe('7 - 5');
    });
  })
  
  describe('When set is NOT a tie breaker', () => {
    it('should return advantage when both players have 3 or more points and a player is leading', () => {
      const matchState: MatchState = {
          gameScore: { [PLAYERS.PLAYER_1]: 6, [PLAYERS.PLAYER_2]: 5 },
          setScore: nonTieBreakerSet
        } as MatchState;
  
      expect(formatGameScore(matchState)).toBe('Advantage player 1');
    });

    it('should return deuce when both players have 3 or more points and points are equal', () => {
      const matchState: MatchState = {
          gameScore: { [PLAYERS.PLAYER_1]: 4, [PLAYERS.PLAYER_2]: 4 },
          setScore: nonTieBreakerSet
        } as MatchState;
  
      expect(formatGameScore(matchState)).toBe('Deuce');
    });
  
    it('should return standard tennis score format when below deuce', () => {
      const matchState: MatchState = {
        gameScore: { [PLAYERS.PLAYER_1]: 2, [PLAYERS.PLAYER_2]: 3 },
        setScore: nonTieBreakerSet
      } as MatchState;

      expect(formatGameScore(matchState)).toBe('30 - 40');
    });
  })
});