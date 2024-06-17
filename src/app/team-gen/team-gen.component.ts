import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Team } from '../models/Team';

@Component({
  selector: 'app-team-gen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-gen.component.html',
  styleUrl: './team-gen.component.css'
})
export class TeamGenComponent {

  team: Team|null = null;
  
  constructor(private teamService: TeamService) {   
    this.team = teamService.generateNewTeam();
  }

}
