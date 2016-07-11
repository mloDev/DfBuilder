import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Injectable } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BattleTypePipe } from '../pipes/battleType-pipe';
import { NgForNumber } from "../pipes/ngForNumber-pipe";

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeType } from "../model/battleGroupeType";
import { BattleGroupeService } from '../service/battleGroupe.service';
import { Fleet } from "../model/fleet";
import { FleetService } from '../service/fleet.service';
import { BBCodeService } from '../service/bbCreate.service';
import { Ship } from '../model/ship';

import { DND_PROVIDERS, DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { BattleGroupeComponent } from "../fleet/battleGroupe.component";
@Component({
    selector: 'fleet',
    pipes: [ BattleTypePipe, NgForNumber],
    templateUrl: 'app/fleet/fleet.html',
    directives: [ DND_DIRECTIVES, MODAL_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, BattleGroupeComponent],
    providers: [ BattleGroupeService, FleetService, BBCodeService ]

})

export class FleetComponent {
    
    fleet: Fleet;
    isFleet: any = false;;
    
    @Input() battleFlag: BattleGroupeType;
    @Input() battleLine: BattleGroupeType;
    @Input() battlePathfinder: BattleGroupeType;
    @Input() battleVanguard: BattleGroupeType;
    
    battleGroupes: BattleGroupe[] = [];
    battleGroupeTypes: BattleGroupeType[] = [];
    
    @ViewChild('modal')
    modal: ModalComponent;
    
    @Output() battle: BattleGroupe;
    
    @Input() gameSize: GameSize;
    @Input() @Output() faction;
    ship: Ship;
    error: any;
    
    myShipChange(event) {
        this.ship =  event;
    }
    constructor(private battleService: BattleGroupeService, private fleetService: FleetService, private bbService: BBCodeService) {
    }
   
    
    onClick(input, $event) {
        if (input === "addLine") {
            if (this.gameSize.lineMin < this.gameSize.lineSize) {
                var battleGroupeLine = new BattleGroupe();
                battleGroupeLine.battleGroupeType = this.battleLine;
                this.fleet.lineBattlegroupes.push(battleGroupeLine);
                this.gameSize.lineMin++;
            }
        } else if (input === "addVanguard") {
            if (this.gameSize.vanguardMin < this.gameSize.vanguardSize) {
                var battleGroupeVanguard = new BattleGroupe();
                battleGroupeVanguard.battleGroupeType = this.battleVanguard;
                this.fleet.vanguardBattlegroupes.push(battleGroupeVanguard);
                this.gameSize.vanguardMin++;
            }
        } else if (input === "addFlag") {
            if (this.gameSize.flagMin < this.gameSize.flagSize) { 
                var battleGroupeFlag = new BattleGroupe();
                battleGroupeFlag.battleGroupeType = this.battleFlag;
                this.fleet.flagBattlegroupes.push(battleGroupeFlag);
                this.gameSize.flagMin++;
            }
        } else if (input === "addPathfinder") {
            if (this.gameSize.pathfinderMin < this.gameSize.pathfinderSize) {
                var battleGroupePathfinder = new BattleGroupe();
                battleGroupePathfinder.battleGroupeType = this.battlePathfinder;
                this.fleet.pathfinderBattlegroupes.push(battleGroupePathfinder);
                this.gameSize.pathfinderMin++;
            }
        }
    }
    
    getBattleGroupes() {
        this.battleService
            .getBattleGroupes()
            .then(battleGroupes => this.battleGroupes = battleGroupes);    
    }
    
    getBattleGroupeTypes() {
        this.battleService
            .getBattleGroupeTypes()
            .then(battleGroupeTypes => this.battleGroupeTypes = battleGroupeTypes);    
    }
    
    ngOnInit(){
        this.getBattleGroupes();
        this.getBattleGroupeTypes();
        this.fleet = new Fleet();
    }
    
    initBattleGoupes(game: GameSize) {
        if (game.lineMin != 0) {
            for (var i = 0; i < game.lineMin; i++) {
                var battleGroupeLine = new BattleGroupe();
                battleGroupeLine.battleGroupeType = this.battleLine;
                this.fleet.lineBattlegroupes.push(battleGroupeLine);
            }    
        } 
        if (game.pathfinderMin != 0) {
            for (var i = 0; i < game.pathfinderMin; i++) {
                var battleGroupePathfinder = new BattleGroupe();
                battleGroupePathfinder.battleGroupeType = this.battlePathfinder;
                this.fleet.pathfinderBattlegroupes.push(battleGroupePathfinder);
            }    
        } 
        if (game.vanguardMin != 0) {
            for (var i = 0; i < game.vanguardMin; i++) {
                var battleGroupeVanguard = new BattleGroupe();
                battleGroupeVanguard.battleGroupeType = this.battleVanguard;
                this.fleet.vanguardBattlegroupes.push(battleGroupeVanguard);    
            }    
        } 
        if (game.flagMin != 0) {
            for (var i = 0; i < game.flagMin; i++) {
                var battleGroupeFlag = new BattleGroupe();
                battleGroupeFlag.battleGroupeType = this.battleFlag;
                this.fleet.flagBattlegroupes.push(battleGroupeFlag);    
            }    
        }   
    }
    
    loadBattleGroupeTypes() {
        for (let i of this.battleGroupeTypes) {
            if (i.battleType == "LINE") {
                this.battleLine =  i;     
            } else if (i.battleType == "FLAG") {
                this.battleFlag =  i; 
            } else if (i.battleType == "VANGUARD") {
                this.battleVanguard =  i;
            } else if (i.battleType == "PATHFINDER") {
                this.battlePathfinder =  i; 
            } 
        }  
    }

    onGameSizeSelected(selectedGameSize: GameSize) {
        this.gameSize = selectedGameSize;
        this.loadBattleGroupeTypes();
    }

    onCreateFleet(){
        this.fleet = new Fleet();
        this.fleet.gameSize = this.gameSize;
        this.fleet.faction = this.faction;
        this.initBattleGoupes(this.fleet.gameSize);
        this.isFleet = true;
    }

    onFactionSelected(selectedFaction: string) {
        this.faction = selectedFaction;
    }

    onSaveFleet() {
      this.fleetService
            .saveFleet(this.fleet)
            .then(fleet => this.fleet = fleet)
            .catch(error => this.error = error);
    }
    
    onBBSave() {
        this.bbService.saveAsBBCode(this.fleet);    
    }

    onExport() {
        var mediaType = 'application/json';
        var data = JSON.stringify(this.fleet);
        var blob = new Blob([data], {type: mediaType});
        var filename = 'test.txt';
        saveAs(blob, filename);
    }
}