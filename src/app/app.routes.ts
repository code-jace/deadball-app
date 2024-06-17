import { Routes } from '@angular/router';
import { TeamGenComponent } from './team-gen/team-gen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {
        path: 'team-gen',
        component: TeamGenComponent,
      },
      // {
      //   path: 'play-ball',
      //   component: GameComponent,
      // },
      
];
