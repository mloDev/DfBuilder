import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import { BattleTypePipe } from '../pipes/battleType-pipe';
import { NgForNumber } from "../pipes/ngForNumber-pipe";
import { Ship } from "../model/ship";

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeService } from '../service/battleGroupe.service';
@Component({
    selector: 'battleGroupeComponent',
    pipes: [ BattleTypePipe, NgForNumber],
    templateUrl: 'app/fleet/battleGroupe.component.html',
    directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, Dragula ],
    providers: [ BattleGroupeService ]

})

export class BattleGroupeComponent {
        
    @Input() battleGroupe: BattleGroupe;
        
    @Input() lightShips: Ship[] = [];
}