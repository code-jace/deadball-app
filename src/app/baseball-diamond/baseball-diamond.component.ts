import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasesState } from '../models/BasesState';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Player } from '../models/Player';


@Component({
  selector: 'app-baseball-diamond',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './baseball-diamond.component.html',
  styleUrl: './baseball-diamond.component.css'
})
export class BaseballDiamondComponent {

  @Input() basesState: BasesState = new BasesState();

  whosOnBase = (baseNumber: number): Player|null => {
    return this.basesState.checkBase(baseNumber) || null;
  }

  isSomeoneOnBase = (baseNumber: number):boolean => {
    return this.whosOnBase(baseNumber) !== null;
  }

}
