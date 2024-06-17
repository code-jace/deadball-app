import { Player } from "./Player";

export class BasesState {
    firstBase: Player|null = null;
    secondBase: Player|null = null;
    thirdBase: Player|null = null;

    constructor(data?: any) {
        const self = this;
        if(!data){
            data = {};
        }    
        Object.assign(self, data);
    }

    checkBase(baseNumber: number): Player|null {
        switch (baseNumber) {
            case 0:
                return this.firstBase;
            case 1:
                return this.secondBase;
            case 2:
                return this.thirdBase;
            default:
                return null;
        }
    }
}