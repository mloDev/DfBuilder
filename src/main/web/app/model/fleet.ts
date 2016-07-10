import { BattleGroupe } from "../model/battleGroupe";
import { GameSize } from '../model/gameSize';

export class Fleet {
    id: number;
    name: string;
    gameSize: GameSize;
    faction = 'all';
    flagBattlegroupes: BattleGroupe[]  = [];
    vanguardBattlegroupes: BattleGroupe[]  = [];
    lineBattlegroupes: BattleGroupe[]  = [];
    pathfinderBattlegroupes: BattleGroupe[]  = [];
    totalPoints: number = 0;
    maxPoints: number;
    constructor() {};
}