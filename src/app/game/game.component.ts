import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { BasesState } from '../models/BasesState';
import { BaseballDiamondComponent } from '../baseball-diamond/baseball-diamond.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BaseballDiamondComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(public gameService: GameService) {}

  getTotalScore(team: string): number {
    if(team === 'Team 1') return this.gameService.score.reduce((total, inning) => total + inning['Team 1'], 0);
    else return this.gameService.score.reduce((total, inning) => total + inning['Team 2'], 0);
  }

  startGame() {
      this.gameService.startGameTimer(500);    
  }

  nextAtBat() {
    this.gameService.nextAtBat();
    if (this.gameService.currentInning > this.gameService.maxInnings) {
      console.log('Game Over');
    }
  }

  getBasesState(): BasesState {
    let bs = new BasesState();
    bs.firstBase = this.gameService.bases[0];
    bs.secondBase = this.gameService.bases[1];
    bs.thirdBase = this.gameService.bases[2];

    return bs;
  }
}
