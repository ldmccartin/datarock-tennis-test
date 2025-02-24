import { isGameWinningPoint, formatGameScore,  } from "../helpers/game.helper";
import { isSetWinningPoint, formatSetScore } from "../helpers/set.helper";
import { PLAYERS } from "../constants/player.constant";

import type { MatchState } from "../types/match.type";
import type { Player } from "../types/player.type";

export const initialiseMatch = (): MatchState => ({
  gameScore: initialiseGame(),
  setScore: { [PLAYERS.PLAYER_1]: 0, [PLAYERS.PLAYER_2]: 0 },
});

const initialiseGame = () =>  {
return { [PLAYERS.PLAYER_1]: 0, [PLAYERS.PLAYER_2]: 0 };
}

export const pointWonBy = (match: MatchState, player: Player): MatchState => {
  if (match.winner) {
    return match;
  }

  const newGameScore = { ...match.gameScore, [player]: match.gameScore[player] + 1 };

  if (!isGameWinningPoint({ gameScore: newGameScore, setScore: match.setScore })) {
    return { ...match, gameScore: newGameScore };
  }

  const newSetScore = { ...match.setScore, [player]: match.setScore[player] + 1}
  const newGame = { gameScore: initialiseGame(), setScore: newSetScore };

  if (!isSetWinningPoint(newGame)) {
    return newGame
  }

  return {...newGame, winner: player};
};

export const getCurrentScore = (match: MatchState) => {
  const { gameScore } = match;
  const player1Score = gameScore[PLAYERS.PLAYER_1];
  const player2Score = gameScore[PLAYERS.PLAYER_2];
  
  if (player1Score === 0 && player2Score === 0) {
    return `"${formatSetScore(match)}"`;
  }

  return `"${formatSetScore(match)}, ${formatGameScore(match)}"`;
}
