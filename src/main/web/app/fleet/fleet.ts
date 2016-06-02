import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { Dragula, DragulaService} from "ng2-dragula";

@Component({
    selector: 'fleet',
    templateUrl: 'app/fleet/fleet.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, Dragula],
    viewProviders: [DragulaService]
})

export class FleetComponent {
        
    constructor() { }
        
    @Input() gameSize: GameSize;
    @Input() @Output() faction;
    
    ngOnInit(){
    }
    
    onItemSelected(selectedItem: GameSize) {
            console.log(selectedItem);
        this.gameSize = selectedItem;
    }
}