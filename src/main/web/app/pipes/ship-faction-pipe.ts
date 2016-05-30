import { Pipe, PipeTransform } from "@angular/core";
import { Ship } from "../model/ship";

@Pipe({
    name: "shipFactionPipe",
    pure: false,
    })

export class ShipFactionPipe implements PipeTransform {
    transform(value, faction): any {
        if (!value || !faction) {
          return null;
        }
        if (faction == "all") {
            return value;
        }
        return value.filter((ship)=>new RegExp(faction.toUpperCase()).test(ship.faction))
    }
          
}