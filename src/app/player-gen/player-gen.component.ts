import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/material.module';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-gen',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './player-gen.component.html',
  styleUrl: './player-gen.component.css'
})
export class PlayerGenComponent {

  constructor(private playerService: PlayerService) {

    

  }

}
