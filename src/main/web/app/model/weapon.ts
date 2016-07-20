import { Special } from '../model/special';

export class Weapon {
    id: number;
    name: string;
    lock: number;
    attack: string;
    damage: number;
    arc: string;
    
    specials: Special[];
}