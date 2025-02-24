import { initialiseMatch, pointWonBy, getCurrentScore } from './handlers/match';
import { PLAYERS } from './constants/player.constant';


export function main() {
  let match = initialiseMatch();
  const players = Object.values(PLAYERS);

  while (!match.winner) {
    match = pointWonBy(match, players[Math.round(Math.random())]);
    console.log(getCurrentScore(match));
  }

  console.log(match.winner, 'wins!')
}

main();