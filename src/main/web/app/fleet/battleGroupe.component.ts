import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { BattleTypePipe } from '../pipes/battleType-pipe';
import { NgForNumber } from "../pipes/ngForNumber-pipe";
import { Ship } from "../model/ship";
import { Fleet } from "../model/fleet";


import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeService } from '../service/battleGroupe.service';
@Component({
    selector: 'battleGroupeComponent',
    pipes: [ BattleTypePipe, NgForNumber],
    templateUrl: 'app/fleet/battleGroupe.component.html',
    directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, DND_DIRECTIVES ],
    providers: [ BattleGroupeService ]

})

export class BattleGroupeComponent {
        
    @Input() battleGroupe: BattleGroupe;
    @Input() fleet: Fleet;
    shipTmp: Ship;
    error: any;
    index:any;
    
    maxShips: number;
    
    constructor(private battleGroupeService: BattleGroupeService) {
        
    }
    
     /**
     * The $event is a structure:
     * {
     *   dragData: any,
     *   mouseEvent: MouseEvent
     * }
     */
    transferDataSuccess($event) {
        if ($event.dragData.shipType === "LIGHTSHIP") {
            this.battleGroupe.lightShips.push($event.dragData);
        } else if ($event.dragData.shipType === "MEDIUMSHIP") {
            this.battleGroupe.mediumShips.push($event.dragData);
        } else if ($event.dragData.shipType === "HEAVYSHIP") {
            this.battleGroupe.heavyShips.push($event.dragData);
        } else if ($event.dragData.shipType === "SUPERSHIP") {
            this.battleGroupe.superHeavyShips.push($event.dragData);
        }
        this.calcMaxShips();
        this.battleGroupe.points = this.battleGroupe.points + $event.dragData.pts;
        console.log(this.battleGroupe.points);
        this.fleet.totalPoints = this.fleet.totalPoints + this.battleGroupe.points;
    }
    
    save() {
        this.battleGroupeService
            .saveBattleGroupe(this.battleGroupe)
            .then(battleGroupe => this.battleGroupe = battleGroupe)
            .catch(error => this.error = error);
    }
    
    clickedRemove(ship) {
        if (ship.shipType === "LIGHTSHIP") {
            this.index = this.battleGroupe.lightShips.indexOf(ship, 0);
                if (this.index > -1) {
                    this.battleGroupe.lightShips.splice(this.index, 1);
                }
        } else if (ship.shipType === "MEDIUMSHIP") {
            this.index = this.battleGroupe.mediumShips.indexOf(ship, 0);
                if (this.index > -1) {
                    this.battleGroupe.mediumShips.splice(this.index, 1);
                }
        } else if (ship.shipType === "HEAVYSHIP") {
            this.index = this.battleGroupe.heavyShips.indexOf(ship, 0);
                if (this.index > -1) {
                    this.battleGroupe.heavyShips.splice(this.index, 1);
                }
        } else if (ship.shipType === "SUPERSHIP") {
            this.index = this.battleGroupe.superHeavyShips.indexOf(ship, 0);
                if (this.index > -1) {
                    this.battleGroupe.superHeavyShips.splice(this.index, 1);
                }
        }  
        this.calcMaxShips();
        this.battleGroupe.points = this.battleGroupe.points - ship.pts;
    }
    
    calcMaxShips() {
        this.maxShips = this.battleGroupe.lightShips.length + this.battleGroupe.mediumShips.length + this.battleGroupe.heavyShips.length + this.battleGroupe.superHeavyShips.length;
    }
    
    ngOnInit() {
        this.battleGroupe.lightShipSize =  this.battleGroupe.battleGroupeType.lightShipMin; 
        this.battleGroupe.mediumShipSize =  this.battleGroupe.battleGroupeType.mediumShipMin;    
        this.battleGroupe.heavyShipSize =  this.battleGroupe.battleGroupeType.heavyShipMin;       
        this.battleGroupe.superHeavyShipSize =  this.battleGroupe.battleGroupeType.superHeavyShipMin; 
        this.calcMaxShips();
        console.log(this.maxShips);
    }
}