import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Fleet } from '../model/fleet';
import { BattleGroupe } from '../model/battleGroupe';

@Injectable()
export class BBCodeService {
        
    fleet: Fleet;
    
    bbCodeString: string;
    headerString: string;
    groupString: string;
    headerSize: number = 150;
    
    generateBBHeader() {
        this.headerString = "[size=" + this.headerSize + "]" + this.fleet.name + "[/size]\n" 
            + this.fleet.gameSize.name + ": " + this.fleet.totalPoints + "/" + this.fleet.maxPoints + " points";
    }
    
    generateBBGroups() {
        this.groupString = "[LIST]";
        //line
        for (let group of  this.fleet.lineBattlegroupes) {
            this.groupString =  this.groupString + "[*][color=#697641][B]Linegroupe[/B][/color] [" + group.points + "]\n[LIST]";
            this.appendShip(group);
            this.groupString =  this.groupString + "[/LIST]" ;
        }
        //pathfinder
        for (let group of  this.fleet.pathfinderBattlegroupes) {
            this.groupString =  this.groupString + "[*][color=#915591][B]Pathfindergroupe[/B][/color] [" + group.points + "]\n[LIST]";
            this.appendShip(group);
            this.groupString =  this.groupString + "[/LIST]" ;
        }
        //vanguard
        for (let group of  this.fleet.vanguardBattlegroupes) {
            this.groupString =  this.groupString + "[*][color=#98741F][B]Vanguardgroupe[/B][/color] [" + group.points + "]\n[LIST]";
            this.appendShip(group);
            this.groupString =  this.groupString + "[/LIST]" ;
        }
        //flag
        for (let group of  this.fleet.flagBattlegroupes) {
            this.groupString =  this.groupString + "[*][color=#436BA3][B]Flaggroupe[/B][/color] [" + group.points + "]\n[LIST]";
            this.appendShip(group);
            this.groupString =  this.groupString + "[/LIST]" ;
        }
        this.groupString = this.groupString + "[/LIST]";
    }
    
    appendShip(group: BattleGroupe) {
        for (let ship of group.lightShips) {
            this.groupString =  this.groupString + "[*]" + ship.shipType + ": " + ship.name + " [" + ship.pts + " pts]";    
        }
        for (let ship of group.mediumShips) {
            this.groupString =  this.groupString + "[*]" + ship.shipType + ": " + ship.name + " [" + ship.pts + " pts]";    
        }
        for (let ship of group.heavyShips) {
            this.groupString =  this.groupString + "[*]" + ship.shipType + ": " + ship.name + " [" + ship.pts + " pts]";    
        }
        for (let ship of group.superHeavyShips) {
            this.groupString =  this.groupString + "[*]" + ship.shipType + ": " + ship.name + " [" + ship.pts + " pts]";    
        }
    }
    
    saveAsBBCode(fleet: Fleet) {
        this.fleet = fleet;
        this.generateBBHeader();
        this.generateBBGroups();
        this.bbCodeString = this.headerString + this.groupString;
        console.log(this.bbCodeString);
    }
}