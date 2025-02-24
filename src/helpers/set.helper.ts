import { PLAYERS } from "../constants/player.constant";
import type { MatchState } from "../types/match.type";

export const isSetWinningPoint = ({ setScore }: MatchState) => {
  const player1Score = setScore[PLAYERS.PLAYER_1];
  const player2Score = setScore[PLAYERS.PLAYER_2];

  if (player1Score < 6 && player2Score < 6) {
    return false;
  }

  const differenceTwoPointsOrGreater = Math.abs(player1Score - player2Score) >= 2;
  if (player1Score === 7 || player2Score === 7 || differenceTwoPointsOrGreater) {
    return true;
  }
  
  return false;
}

export const formatSetScore = ({ setScore }: MatchState) => {
  return `${setScore[PLAYERS.PLAYER_1]} - ${setScore[PLAYERS.PLAYER_2]}`;
}

export const isTieBreaker = ({ setScore }: MatchState) => {
  return setScore[PLAYERS.PLAYER_1] === 6 && setScore[PLAYERS.PLAYER_2] === 6;
}