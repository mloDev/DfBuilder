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
            var newObject = JSON.parse(JSON.stringify($event.dragData));
            newObject.gcurrent = newObject.gmin;
            newObject.pts = newObject.pts * newObject.gcurrent;
            this.battleGroupe.lightShips.push(newObject);
        } else if ($event.dragData.shipType === "MEDIUMSHIP") {            
            var newObject = JSON.parse(JSON.stringify($event.dragData));
            newObject.gcurrent = newObject.gmin;
            newObject.pts = newObject.pts * newObject.gcurrent;
            this.battleGroupe.mediumShips.push(newObject);
        } else if ($event.dragData.shipType === "HEAVYSHIP") {
            var newObject = JSON.parse(JSON.stringify($event.dragData));
            newObject.gcurrent = newObject.gmin;
            newObject.pts = newObject.pts * newObject.gcurrent;
            this.battleGroupe.heavyShips.push(newObject);
        } else if ($event.dragData.shipType === "SUPERSHIP") {
            var newObject = JSON.parse(JSON.stringify($event.dragData));
            newObject.gcurrent = newObject.gmin;
            newObject.pts = newObject.pts * newObject.gcurrent;
            this.battleGroupe.superHeavyShips.push(newObject);
        }
        this.battleGroupe.points = this.battleGroupe.points + $event.dragData.pts * $event.dragData.gmin;
        this.fleet.totalPoints = this.fleet.totalPoints + $event.dragData.pts * $event.dragData.gmin;
        this.calcMaxShips();
    }
    
    save() {
        this.battleGroupeService
            .saveBattleGroupe(this.battleGroupe)
            .then(battleGroupe => this.battleGroupe = battleGroupe)
            .catch(error => this.error = error);
    }
    
    removeShip(ship) {
        this.fleet.totalPoints = this.fleet.totalPoints - ship.pts;
        this.battleGroupe.points = this.battleGroupe.points - ship.pts;
        ship.pts =  (ship.pts / ship.gcurrent) * (ship.gcurrent - 1);
        ship.gcurrent--;
        this.battleGroupe.points = this.battleGroupe.points + ship.pts;
        this.fleet.totalPoints = this.fleet.totalPoints + ship.pts;
        this.calcMaxShips();
    }
    
    addShip(ship) {
        this.fleet.totalPoints = this.fleet.totalPoints - ship.pts;
        this.battleGroupe.points = this.battleGroupe.points - ship.pts;
        ship.pts =  (ship.pts / ship.gcurrent) * (ship.gcurrent + 1);
        ship.gcurrent++;
        this.battleGroupe.points = this.battleGroupe.points + ship.pts;
        this.fleet.totalPoints = this.fleet.totalPoints + ship.pts;
        this.calcMaxShips();
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
        this.battleGroupe.points = this.battleGroupe.points - ship.pts;
        this.fleet.totalPoints = this.fleet.totalPoints - ship.pts;
        this.calcMaxShips();
    }
    
    over(ship) {
        console.log(ship);    
    }
    
    removeBattleGroupe() {        
        if (this.battleGroupe.battleGroupeType.battleType === "LINE") {
            this.index = this.fleet.lineBattlegroupes.indexOf(this.battleGroupe, 0);
                if (this.index > -1) {
                    this.fleet.lineBattlegroupes.splice(this.index, 1);
                    this.fleet.lineCurrent--;
                }
        } else if (this.battleGroupe.battleGroupeType.battleType === "FLAG") {
            this.index = this.fleet.flagBattlegroupes.indexOf(this.battleGroupe, 0);
                if (this.index > -1) {
                    this.fleet.flagBattlegroupes.splice(this.index, 1);
                    this.fleet.flagCurrent--;
                }
        } else if (this.battleGroupe.battleGroupeType.battleType === "VANGUARD") {
            this.index = this.fleet.vanguardBattlegroupes.indexOf(this.battleGroupe, 0);
                if (this.index > -1) {
                    this.fleet.vanguardBattlegroupes.splice(this.index, 1);
                    this.fleet.vanguardCurrent--;
                }
        } else if (this.battleGroupe.battleGroupeType.battleType === "PATHFINDER") {
            this.index = this.fleet.pathfinderBattlegroupes.indexOf(this.battleGroupe, 0);
                if (this.index > -1) {
                    this.fleet.pathfinderBattlegroupes.splice(this.index, 1);
                    this.fleet.pathfinderCurrent--;
                }
        }
        this.fleet.totalPoints = this.fleet.totalPoints - this.battleGroupe.points;
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
    }
}