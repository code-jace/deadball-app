import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  rollDice(dice: string): number {    
    if(dice.startsWith('d')){ // allow shorthand for 1d6, etc. d6
      dice = '1'+dice;
    }
    const [count, die] = dice.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * die) + 1;
    }
    return total;
  }
  
}
