import { Injectable } from '@angular/core';
import { Player } from '../models/Player';
import { DiceService } from './dice.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private diceService: DiceService) { }

  private POSITIONS: { [key: number]: string } = {
    1: "Utility", 2: "Catcher", 3: "First Base", 4: "Second Base", 5: "Second Base",
    6: "Shortstop", 7: "Left Field", 8: "Center Field", 9: "Right Field",
    10: "Starting Pitcher", 11: "Starting Pitcher", 12: "Starting Pitcher",
    13: "Starting Pitcher", 14: "Starting Pitcher", 15: "Starting Pitcher",
    16: "Relief Pitcher", 17: "Relief Pitcher", 18: "Relief Pitcher",
    19: "Relief Pitcher", 20: "Relief Pitcher"
  };

  private HANDEDNESS: { [key: number]: string } = {
    1: "Right Handed", 2: "Right Handed", 3: "Right Handed", 4: "Right Handed",
    5: "Right Handed", 6: "Right Handed", 7: "Left Handed", 8: "Left Handed",
    9: "Left Handed", 10: "Switch Hitter"
  };

  private TRAITS: { [type: string]: { [key: number]: string } } = {
    "Batters": {
      2: "P--", 3: "P-", 4: "S-", 5: "C-", 6: "D-", 7: "None", 8: "None",
      9: "None", 10: "None", 11: "None", 12: "None", 13: "None", 14: "None",
      15: "D+", 16: "P+", 17: "C+", 18: "S+", 19: "T+", 20: "P++"
    },
    "Pitchers": {
      2: "None", 3: "None", 4: "None", 5: "CN-", 6: "None", 7: "None",
      8: "None", 9: "None", 10: "None", 11: "None", 12: "None", 13: "None",
      14: "None", 15: "K+", 16: "GB+", 17: "CN+", 18: "ST+", 19: "None", 20: "None"
    }
  };

  private MODERN_PITCH_DIE: { [key: number]: string } = {
    1: "d12", 2: "d8", 3: "d8", 4: "d4", 5: "d4", 6: "d4", 7: "d4", 8: "-d4"
  };

  private rollOnTable(table: { [key: number]: string }): string {
    const roll = this.diceService.rollDice('1d'+Object.keys(table).length);
    return table[roll];
  }

  private determineAgeBracket(): string {
    const ageBracketRoll = this.diceService.rollDice('1d4');
    if (ageBracketRoll === 1) {
      return 'Prospect';
    } else if (ageBracketRoll === 2) {
      return 'Rookie';
    } else if (ageBracketRoll === 3) {
      return 'Veteran';
    } else {
      return 'Old Timer';
    }
  }

  
  /**
   * Retrieves the traits for a player based on the given traits roll, position, and top prospect status.
   * 
   * @param traitsRoll - The roll value used to determine the traits.
   * @param position - The position of the player.
   * @param topProspect - Optional. Specifies whether the player is a top prospect.
   * @returns The traits of the player as a string.
   */
  private getTraits(traitsRoll: number, position: string, topProspect?: boolean): string {


    const traitType = position.includes('Pitcher') ? "Pitchers" : "Batters";
    let trait = this.TRAITS[traitType][traitsRoll];
    if (trait !== "None" && topProspect) {

      let secondTraitRoll = this.diceService.rollDice('2d10');
      let secondTrait = this.TRAITS[traitType][secondTraitRoll];
      
      while (secondTrait === trait) {
        secondTraitRoll = this.diceService.rollDice('2d10');
        secondTrait = this.TRAITS[traitType][secondTraitRoll];
      }

      if(secondTrait !== "None") {
        trait += ", " + secondTrait;
      }

    }
    return trait;
  }

  private getPitchDie(topProspect?: boolean): string {
    const roll = topProspect ? this.diceService.rollDice('1d8') : this.diceService.rollDice('1d8') +2;

    return this.MODERN_PITCH_DIE[Math.min(roll, 8)];
  }

  /**
   * Generates a baseball player with optional specific position and mechanical prospect status.
   * If specificPosition is not provided, a position is randomly selected from the available positions.
   * If mechanicallyTopProspect is true, the player is considered a top prospect with enhanced traits.
   * 
   * @param specificPosition - Optional. The specific position of the player.
   * @param mechanicallyTopProspect - Optional. Indicates if the player is a mechanically top prospect.
   * @returns The generated baseball player object.
   */
  generateBaseballPlayer(specificPosition?: string, mechanicallyTopProspect?: boolean): Player {

    const position = specificPosition || this.rollOnTable(this.POSITIONS);
    const handedness = this.rollOnTable(this.HANDEDNESS);
    const ageBracket = this.determineAgeBracket();

    let age: number = this.diceService.rollDice('1d6');
    switch (ageBracket) {
      case 'Prospect':
        age = age + 18;
        break;
      case 'Rookie':
        age = age + 21;
        break;
      case 'Veteran':
        age = age + 27;
        break;
      case 'Old Timer':
        age = age + 32;
        break;
    }

    const traitsRoll = this.diceService.rollDice('2d10');
    const traits = this.getTraits(traitsRoll, position, mechanicallyTopProspect);

    let batterTarget: number;
    let onBaseTarget: number;
    let pitchDie: string | null = null;

    if (position.includes('Pitcher')) {
      pitchDie = this.getPitchDie(mechanicallyTopProspect);
      batterTarget = this.diceService.rollDice('2d6') + 12;
      onBaseTarget = batterTarget + this.diceService.rollDice('1d8');
    } else {
      batterTarget = this.diceService.rollDice('2d10') + 15;
      onBaseTarget = batterTarget + this.diceService.rollDice('2d4');
    }

    return {
      name: 'Make it up!',
      jerseyNumber: 'Make It Up! ' + this.diceService.rollDice('1d100') +'?',
      position: position,
      handedness: handedness,
      age: age,
      traits: traits,
      batterTarget: batterTarget,
      onBaseTarget: onBaseTarget,
      pitchDie: pitchDie
    };
  }

  generateBenchPlayer(): Player {
    const benchPositions = ['Infield', 'Outfield', 'Utility', 'Catcher'];
    const specificPosition = benchPositions[Math.floor(Math.random() * benchPositions.length)];
    return this.generateBaseballPlayer(specificPosition);
  }
}
