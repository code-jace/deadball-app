export interface Player {
    name: string;
    jerseyNumber: string;
    position: string;
    handedness: string;
    age: number;
    traits: string;
    batterTarget: number;
    onBaseTarget: number;
    pitchDie: string | null; // For pitchers, null for position players
  }