import { getGameScoreAsDeuceOrAdvantage, getPlayerScoreAsTennisValue } from "./score.helper";

import { PLAYERS } from "../constants/player.constant";
import type { MatchState } from "../types/match.type";
import { isTieBreaker } from "./set.helper";

export const isGameWinningPoint = (match: MatchState) => {
  const { gameScore } = match;
  const player1Score = gameScore[PLAYERS.PLAYER_1];
  const player2Score = gameScore[PLAYERS.PLAYER_2];

  if (player1Score < 4 && player2Score < 4) {
    return false;
  }

  const differenceTwoPointsOrGreater = Math.abs(player1Score - player2Score) >= 2;

  if (!isTieBreaker(match) && differenceTwoPointsOrGreater) {
    return true;
  }

  if ((player1Score >= 7 || player2Score >= 7) && differenceTwoPointsOrGreater) {
    return true;
  }

  return false;
}

export const formatGameScore = (match: MatchState) => {
  const { gameScore } = match;
  const player1Score = gameScore[PLAYERS.PLAYER_1];
  const player2Score = gameScore[PLAYERS.PLAYER_2];
  
  if (isTieBreaker(match)) {
    return `${player1Score} - ${player2Score}`;
  }

  if (player1Score >= 3 && player2Score >= 3) {
    return getGameScoreAsDeuceOrAdvantage(match);
  }

  return `${getPlayerScoreAsTennisValue(player1Score)} - ${getPlayerScoreAsTennisValue(player2Score)}`;
}