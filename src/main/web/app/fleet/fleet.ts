import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";

@Component({
    selector: 'fleet',
    templateUrl: 'app/fleet/fleet.html', 
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, GameSizeSelector, FactionSelector]
})

export class FleetComponent {
    @Output() select = new EventEmitter();
        
    constructor() { }
        
    @Input() gameSize: GameSize;
    @Input() faction;
    
    ngOnInit(){
    }
}