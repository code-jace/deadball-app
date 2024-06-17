import { Player } from "./Player";

export interface Team {
    positionPlayers: Player[];
    benchPlayers: Player[];
    startingPitchers: Player[];
    reliefPitchers: Player[];
  }