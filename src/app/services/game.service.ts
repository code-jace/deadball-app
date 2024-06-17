import { Injectable } from '@angular/core';
import { Team } from '../models/Team';
import { TeamService } from './team.service';
import { DiceService } from './dice.service';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  team1: Team;
  team2: Team;

  score: { 'Team 1': number, 'Team 2': number }[] = [];
  currentInning = 1;
  maxInnings = 9;
  outs = 0;
  bases: Array<Player|null> = [null, null, null];
  isTeam1Batting = true;
  private gameTimer: NodeJS.Timeout | null = null;
  autoAdvanceEnabled = false; // Flag to track auto advance mode



  constructor(private teamService: TeamService, private diceService: DiceService) {
    this.team1 = this.teamService.generateNewTeam();
    this.team2 = this.teamService.generateNewTeam();

    for (let i = 0; i < this.maxInnings; i++) {
      this.score.push({ 'Team 1': 0, 'Team 2': 0 });
    }
   }

   toggleAutoAdvance() {
    this.autoAdvanceEnabled = !this.autoAdvanceEnabled;

    if (this.autoAdvanceEnabled) {
      // Start the game timer with an interval of 2000 milliseconds (adjust interval as needed)
      this.startGameTimer(2000);
    } else {
      // Stop the game timer if auto advance is disabled
      this.stopGameTimer();
    }
  }

   startGameTimer(interval: number) {
    this.gameTimer = setInterval(() => {
      this.nextAtBat();
    }, interval);
  }

  stopGameTimer() {
    if(this.gameTimer){
      clearInterval(this.gameTimer);
    }
  }


  nextAtBat() {
    if(this.currentInning > this.maxInnings) return;
    
    const team = this.isTeam1Batting ? this.team1 : this.team2;
    const opponentTeam = this.isTeam1Batting ? this.team2 : this.team1;
  
    const batter = this.getRandomPlayer(team.positionPlayers);
    const pitcher = this.getRandomPlayer(opponentTeam.startingPitchers);
  
    const result = this.atBat(batter, pitcher);
    console.log(result);
  
    if (result === "Out") {
      this.outs++;
    } else if (result === "Walk") {
      this.advanceRunners(batter, 1);
    } else if (result.startsWith("Hit")) {
      const hitLevel = parseInt(result.split(': ')[1], 10);
      this.advanceRunners(batter, hitLevel);
    }
  
    if (this.outs >= 3) {
      this.changeSides();
    }
  }
  
  private atBat(batter: Player, pitcher: Player): string {
    const swingScore = this.diceService.rollDice('1d100');
    const pitchDieRoll = this.diceService.rollDice(pitcher.pitchDie!);
    const mss = swingScore + pitchDieRoll;

    if (mss <= 1) return "Oddity";
    if (mss <= 5) return `Critical Hit: ${this.diceService.rollDice('1d20')}`;
    if (mss <= batter.batterTarget) return `Hit: ${this.diceService.rollDice('1d20')}`;
    if (mss <= batter.onBaseTarget) return "Walk";
    if (mss <= batter.onBaseTarget + 5) return "Possible Error";
    if (mss <= 49) return "Productive Out";
    if (mss <= 69) return "Productive Out";
    return "Out";
  }

  private advanceRunners(batter: Player, basesToAdvance: number) {
    // Handle runners on base and scoring
    for (let i = 2; i >= 0; i--) {
      if (this.bases[i]) {
        const newBaseIndex = i + basesToAdvance;
        if (newBaseIndex > 2) {
          this.score[this.currentInning - 1][this.isTeam1Batting ? 'Team 1' : 'Team 2']++;
          this.bases[i] = null;
        } else {
          this.bases[newBaseIndex] = this.bases[i];
          this.bases[i] = null;
        }
      }
    }
    if (basesToAdvance <= 2) {
      this.bases[basesToAdvance - 1] = batter;
    }
  }

  private changeSides() {
    this.outs = 0;
    this.bases = [null, null, null];
    this.isTeam1Batting = !this.isTeam1Batting;
    if (!this.isTeam1Batting) {
      this.currentInning++;
      // Check if the game should end after the top of the 9th inning
      if (this.currentInning > this.maxInnings && this.outs >= 3) {
        this.endGameLogic();
      }
    }
  }

  private getRandomPlayer(players: Player[]): Player {
    return players[Math.floor(Math.random() * players.length)];
  }

  endGameLogic() {
    this.stopGameTimer();
    console.log("GAME OVER");
  }

}
