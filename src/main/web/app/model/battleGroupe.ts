import { BattleGroupeType } from "../model/battleGroupeType";

export class BattleGroupe {
    id: number;
    battleGroupeType: BattleGroupeType;
    lightShipSize: number;
    mediumShipSize: number;
    heavyShipSize: number;
    superHeavyShipSize: number;
    
    constructor() {};
}