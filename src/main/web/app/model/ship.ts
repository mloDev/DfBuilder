import { Weapon } from '../model/weapon';
import { Load } from '../model/load';
import { Special } from '../model/special';

export class Ship {
  id: number;
  name: string;
  scan: number;
  sig: string;
  thrust: number;
  hull: number;
  a: string;
  pd: number;
  gmin: number;
  gmax: number;
  gcurrent: number = 0;
  t: string;
  faction: string;
  pts: number;
  shipType: string;
  factionLogoURL: string;
    
  weapons: Weapon[];
  specials: Special[];
  loads: Load[];
    
  constructor() {};
}