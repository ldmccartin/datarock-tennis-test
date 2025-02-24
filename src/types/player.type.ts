import { PLAYERS } from "../constants/player.constant";
import type { ValueOf  } from "./generic.type";

export type Player = ValueOf<typeof PLAYERS>;
