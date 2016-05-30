import { Pipe, PipeTransform } from "@angular/core";
import { Ship } from "../model/ship";

@Pipe({
    name: "shipTypePipe",
    pure: false,
    })

export class ShipTypePipe implements PipeTransform {
    transform(value: Ship[], shipType): any {
        if (value==null) {
          return null;
        }
        if (shipType == "") {
            return value;
        }
        return value.filter((ship)=>new RegExp(shipType).test(ship.shipType))
    }
          
}