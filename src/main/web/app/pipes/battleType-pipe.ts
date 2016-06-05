import { Pipe, PipeTransform } from "@angular/core";
import { Ship } from "../model/ship";

@Pipe({
    name: "battleTypePipe",
    pure: false,
    })

export class BattleTypePipe implements PipeTransform {
    transform(value, battleType): any {
        if (!value || !battleType) {
          return null;
        }
        return value.filter((battle)=>new RegExp(battleType.toUpperCase()).test(battle.battleGroupeType.battleType))
    }
          
}