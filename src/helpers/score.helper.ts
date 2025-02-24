import type { MatchState } from "../types/match.type";

export const getGameScoreAsDeuceOrAdvantage = ({ gameScore }: MatchState) => {
  const player1Score = gameScore["Player 1"];
  const player2Score = gameScore["Player 2"];

  if (player1Score > player2Score) {
    return 'Advantage player 1';
  }

  if (player2Score > player1Score) {
    return 'Advantage player 2';
  }

  return 'Deuce';
}

export const getPlayerScoreAsTennisValue = (score: number) => {
  switch (score) {
    case 0:
      return '0';
    case 1:
      return '15';
    case 2:
      return '30';
    case 3:
      return '40'
    default:
      throw new Error(`Unexpected value when transforming player score: ${score} to tennis value`);
  }
}