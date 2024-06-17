import { Injectable } from '@angular/core';
import { Team } from '../models/Team';
import { Player } from '../models/Player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private playerService: PlayerService) { }



  /**
   * Generates a new team with position players, bench players, starting pitchers, and relief pitchers.
   * @returns The generated team object.
   */
  generateNewTeam(): Team {


    const positions = ['Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Left Field', 'Center Field', 'Right Field'];
    const positionPlayers = positions.map(pos => this.playerService.generateBaseballPlayer(pos, true));
    
    // const utilityPlayer = this.playerService.generateBaseballPlayer('Utility', true);
    // positionPlayers.push(utilityPlayer);

    // const benchPlayers = Array(3).fill(null).map(() => this.playerService.generateBenchPlayer(),true)
    //   .concat(Array(1).fill(null).map(() => this.playerService.generateBenchPlayer(),true))
    //   .concat(Array(1).fill(null).map(() => this.playerService.generateBenchPlayer(),true));

    const benchPlayers: Array<Player> = [];
    benchPlayers.push(this.playerService.generateBaseballPlayer('Infield', true)); 
    benchPlayers.push(this.playerService.generateBaseballPlayer('Infield', true)); 
    benchPlayers.push(this.playerService.generateBaseballPlayer('Outfield', true)); 
    benchPlayers.push(this.playerService.generateBaseballPlayer('Outfield', true)); 
    benchPlayers.push(this.playerService.generateBaseballPlayer('Utility', true)); 

    const startingPitchers = Array(5).fill(null).map(() => this.playerService.generateBaseballPlayer('Starting Pitcher'),true);
    const reliefPitchers = Array(5).fill(null).map(() => this.playerService.generateBaseballPlayer('Relief Pitcher'),true);

    return {
      PositionPlayers: positionPlayers,
      BenchPlayers: benchPlayers,
      StartingPitchers: startingPitchers,
      ReliefPitchers: reliefPitchers
    };
  }
}