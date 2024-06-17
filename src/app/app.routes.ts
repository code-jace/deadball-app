import { Routes } from '@angular/router';
import { TeamGenComponent } from './team-gen/team-gen.component';

export const routes: Routes = [
    {
        path: 'team-gen',
        component: TeamGenComponent,
      },
      
      { path: '**', redirectTo: 'team-gen' },
];
