import { BattleGroupeType } from "../model/battleGroupeType";
import { Ship } from "../model/ship";

export class BattleGroupe {
    id: number;
    battleGroupeType: BattleGroupeType;
    lightShipSize: number;
    mediumShipSize: number;
    heavyShipSize: number;
    superHeavyShipSize: number;
    lightShips: Ship[] = [];
    mediumShips: Ship[] = [];
    heavyShips: Ship[] = [];
    superHeavyShips: Ship[] = [];
    points: number = 0;
    
    constructor() {};
}