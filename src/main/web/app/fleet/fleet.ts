import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, Injectable } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BattleTypePipe } from '../pipes/battleType-pipe';
import { NgForNumber } from "../pipes/ngForNumber-pipe";
import { TOOLTIP_DIRECTIVES } from 'ng2-tooltip';

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeType } from "../model/battleGroupeType";
import { BattleGroupeService } from '../service/battleGroupe.service';
import { Fleet } from "../model/fleet";
import { FleetService } from '../service/fleet.service';
import { BBCodeService } from '../service/bbCreate.service';
import { Ship } from '../model/ship';

import { DND_PROVIDERS, DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { BattleGroupeComponent } from "../fleet/battleGroupe.component";

declare var pdfMake: any;
declare var buildPdf: any;

@Component({
    selector: 'fleet',
    pipes: [ BattleTypePipe, NgForNumber],
    templateUrl: 'app/fleet/fleet.html',
    directives: [ TOOLTIP_DIRECTIVES, DND_DIRECTIVES, MODAL_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, BattleGroupeComponent],
    providers: [ BattleGroupeService, FleetService, BBCodeService ],
    changeDetection: ChangeDetectionStrategy.OnPush

})

export class FleetComponent {
    
    pdf: any;
    
    fleet: Fleet;
    isFleet: any = false;
    printShipDetails = true;
    
    @Input() battleFlag: BattleGroupeType;
    @Input() battleLine: BattleGroupeType;
    @Input() battlePathfinder: BattleGroupeType;
    @Input() battleVanguard: BattleGroupeType;
    
    copyBBCode: string;
    
    battleGroupes: BattleGroupe[] = [];
    battleGroupeTypes: BattleGroupeType[] = [];
    
    @ViewChild('modal')
    modal: ModalComponent;
    
    @Output() battle: BattleGroupe;
    
    @Input() gameSize: GameSize;
    @Input() @Output() faction;
    ship: Ship;
    error: any;
    
    shipList: Ship[] = [];
    
    myShipChange(event) {
        this.ship =  event;
    }
    constructor(private battleService: BattleGroupeService, private fleetService: FleetService, private bbService: BBCodeService) {
    }
   
    
    onClick(input, $event) {
        if (input === "addLine") {
            if (this.fleet.lineCurrent < this.gameSize.lineSize) {
                var battleGroupeLine = new BattleGroupe();
                battleGroupeLine.battleGroupeType = this.battleLine;
                this.fleet.lineBattlegroupes.push(battleGroupeLine);
                this.fleet.lineCurrent++;
            }
        } else if (input === "addVanguard") {
            if (this.fleet.vanguardCurrent < this.gameSize.vanguardSize) {
                var battleGroupeVanguard = new BattleGroupe();
                battleGroupeVanguard.battleGroupeType = this.battleVanguard;
                this.fleet.vanguardBattlegroupes.push(battleGroupeVanguard);
                this.fleet.vanguardCurrent++;
            }
        } else if (input === "addFlag") {
            if (this.fleet.flagCurrent < this.gameSize.flagSize) { 
                var battleGroupeFlag = new BattleGroupe();
                battleGroupeFlag.battleGroupeType = this.battleFlag;
                this.fleet.flagBattlegroupes.push(battleGroupeFlag);
                this.fleet.flagCurrent++;
            }
        } else if (input === "addPathfinder") {
            if (this.fleet.pathfinderCurrent < this.gameSize.pathfinderSize) {
                var battleGroupePathfinder = new BattleGroupe();
                battleGroupePathfinder.battleGroupeType = this.battlePathfinder;
                this.fleet.pathfinderBattlegroupes.push(battleGroupePathfinder);
                this.fleet.pathfinderCurrent++;
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
        this.fleet.lineCurrent = this.gameSize.lineMin;
        this.fleet.flagCurrent = this.gameSize.flagMin;
        this.fleet.vanguardCurrent = this.gameSize.vanguardMin;
        this.fleet.pathfinderCurrent = this.gameSize.pathfinderMin;
        
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
       this.copyBBCode = this.bbService.saveAsBBCode(this.fleet);    
    }

    onExport() {
        var mediaType = 'application/json';
        var data = JSON.stringify(this.fleet);
        var blob = new Blob([data], {type: mediaType});
        var filename = 'test.txt';
        saveAs(blob, filename);
    }
    
    createShipList() {
    
        for (let bat of this.fleet.lineBattlegroupes) {
                for (let ship of bat.lightShips) {
                    this.shipList.push(ship);  
                }
        }
    }
    
    
    onOpenPdf() {
        
        if (this.printShipDetails) {
            this.createShipList(); 
            console.log(this.shipList);   
        }
        this.pdf = pdfMake;
        this.pdf.createPdf(buildPdf(this.fleet, this.shipList, this.printShipDetails)).open();
    }
}