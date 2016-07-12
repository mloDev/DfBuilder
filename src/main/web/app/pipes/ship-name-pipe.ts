import { Pipe, PipeTransform } from "@angular/core";
import { Ship } from "../model/ship";

@Pipe({
    name: "shipNamePipe",
    pure: false,
    })

export class ShipNamePipe implements PipeTransform {
    transform(value: Ship[], name): any {
        if (value==null) {
          return null;
        }
        if (name == "") {
            return value;
        }
        return value.filter((ship)=>new RegExp(name.toLowerCase()).test(ship.name.toLowerCase()))
    }
          
}