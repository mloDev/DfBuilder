import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import { BattleTypePipe } from '../pipes/battleType-pipe';

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeService } from '../service/battleGroupe.service';
@Component({
    selector: 'fleet',
    pipes: [ BattleTypePipe ],
    templateUrl: 'app/fleet/fleet.html',
    directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, Dragula ],
    providers: [ BattleGroupeService ],
    viewProviders: [ DragulaService ]

})

export class FleetComponent {
    arrLine:Array<number>;
    arrFlag:Array<number>;
    arrVanguard:Array<number>;
    arrPathfinder:Array<number>;
    
    battleFlags: BattleGroupe[] = [];
    battleLine: BattleGroupe[] = [];
    battlePathfinder: BattleGroupe[] = [];
    battleVanguard: BattleGroupe[] = [];
    
    battleGroupes: BattleGroupe[];
    
    @Output() battle: BattleGroupe;
    
    @Input() gameSize: GameSize;
    @Input() @Output() faction;
        
    constructor(private dragulaService: DragulaService, private battleService: BattleGroupeService) {
        dragulaService.setOptions('light-bag', {
            copy: true,
            revertOnSpill: true    
        }); 
    }
        
    onClick(input, $event) {
        if (input === "addLine") {
            if (this.gameSize.lineMin < this.gameSize.lineSize) {
                console.log($event);
                this.gameSize.lineMin++;
                this.arrLine = Array(this.gameSize.lineMin).fill(1);
                while (this.arrLine.length > this.battleLine.length) {
                    this.battleLine.push(new BattleGroupe());
                    console.log(this.battleLine.length);
                }
            }
        } else if (input === "addVanguard") {
            if (this.gameSize.vanguardMin < this.gameSize.vanguardSize) {
                this.gameSize.vanguardMin++;
                this.arrVanguard = Array(this.gameSize.vanguardMin).fill(1);
            }
        } else if (input === "addFlag") {
            if (this.gameSize.flagMin < this.gameSize.flagSize) {
                this.gameSize.flagMin++;
                this.arrFlag = Array(this.gameSize.flagMin).fill(1);
            }
        } else if (input === "addPathfinder") {
            if (this.gameSize.pathfinderMin < this.gameSize.pathfinderSize) {
                this.gameSize.pathfinderMin++;
                this.arrPathfinder = Array(this.gameSize.pathfinderMin).fill(1);
            }
        }
    }
    
    getBattleGroupes() {
        this.battleService
            .getBattleGroupes()
            .then(battleGroupes => this.battleGroupes = battleGroupes);    
    }
    
    ngOnInit(){
        this.getBattleGroupes();
    }
    
    onItemSelected(selectedItem: GameSize) {
        this.gameSize = selectedItem;
        if (this.gameSize != null) {
            this.arrLine = Array(this.gameSize.lineMin).fill(1);
            this.arrVanguard = Array(this.gameSize.vanguardMin).fill(1);
            this.arrFlag = Array(this.gameSize.flagMin).fill(1);
            this.arrPathfinder = Array(this.gameSize.pathfinderMin).fill(1);
        } 
    }
}