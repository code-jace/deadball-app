import { Player } from "./Player";

export interface Team {
    PositionPlayers: Player[];
    BenchPlayers: Player[];
    StartingPitchers: Player[];
    ReliefPitchers: Player[];
  }