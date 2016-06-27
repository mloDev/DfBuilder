import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { GameSize } from '../model/gameSize';
import { GameSizeSelector } from "../selector/gameSize-selector";
import { FactionSelector } from "../selector/faction-selector";
import { ShipList } from "../ship/ship.list";
import { Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BattleTypePipe } from '../pipes/battleType-pipe';
import { NgForNumber } from "../pipes/ngForNumber-pipe";

import { BattleGroupe } from "../model/battleGroupe";
import { BattleGroupeService } from '../service/battleGroupe.service';
import {Tabs} from '../navbar/tabs';
import {Tab} from '../model/tab';
import {Ship} from '../model/ship';

import { BattleGroupeComponent } from "../fleet/battleGroupe.component";
@Component({
    selector: 'fleet',
    pipes: [ BattleTypePipe, NgForNumber],
    templateUrl: 'app/fleet/fleet.html',
    directives: [ MODAL_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShipList, GameSizeSelector, FactionSelector, Dragula, BattleGroupeComponent, Tabs, Tab ],
    providers: [ BattleGroupeService ],
    viewProviders: [ DragulaService ]

})

export class FleetComponent {
    
    @Input() battleFlags: BattleGroupe[] = [];
    @Input() battleLines: BattleGroupe[] = [];
    @Input() battlePathfinders: BattleGroupe[] = [];
    @Input() battleVanguards: BattleGroupe[] = [];
    
    @Input() battleFlag: BattleGroupe;
    @Input() battleLine: BattleGroupe;
    @Input() battlePathfinder: BattleGroupe;
    @Input() battleVanguard: BattleGroupe;
    
    battleGroupes: BattleGroupe[] = [];
    
    @ViewChild('modal')
    modal: ModalComponent;
    
    @Output() battle: BattleGroupe;
    
    @Input() gameSize: GameSize;
    @Input() @Output() faction;
    
    constructor(private dragulaService: DragulaService, private battleService: BattleGroupeService) {
        dragulaService.setOptions('light-bag', {
           accepts:    function (el, target, source, sibling) {
                    if (target.className.indexOf("isEmpty") > 1 && target.className.indexOf("isFilled") == -1) {
                        return true;
                    } else {
                        return false;    
                    }
            },
              copy: function (el, source) {
                return source === document.getElementById('light-bag-list')
              }   
        })
        dragulaService.setOptions('medium-bag', {
            accepts:    function (el, target, source, sibling) {
                    if (target.className.indexOf("isEmpty") > 1 && target.className.indexOf("isFilled") == -1) {
                        return true;
                    } else {
                        return false;    
                    }
            },
            copy: function (el, source) {
                return source === document.getElementById('medium-bag-list')
              },
            removeOnSpill: true
        })
        dragulaService.setOptions('heavy-bag', {
            accepts:    function (el, target, source, sibling) {
                    if (target.className.indexOf("isEmpty") > 1 && target.className.indexOf("isFilled") == -1) {
                        return true;
                    } else {
                        return false;    
                    }
            },
                copy: function (el, source) {
                return source === document.getElementById('heavy-bag-list')
              }   
        })
        dragulaService.setOptions('superHeavy-bag', {
            accepts:    function (el, target, source, sibling) {
                    if (target.className.indexOf("isEmpty") > 1 && target.className.indexOf("isFilled") == -1) {
                        return true;
                    } else {
                        return false;    
                    }
            },
                copy: function (el, source) {
                return source === document.getElementById('superHeavy-bag-list')
              } 
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
        dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
          dragulaService.dropModel.subscribe((value) => {
            //this.onDropModel(value.slice(1));
          });
          dragulaService.removeModel.subscribe((value) => {
            //this.onRemoveModel(value.slice(1));
          });
    }
   
    
    onClick(input, $event) {
        if (input === "addLine") {
            if (this.gameSize.lineMin < this.gameSize.lineSize) {
                this.battleLines.push(this.battleLine);
                this.gameSize.lineMin++;
            }
        } else if (input === "addVanguard") {
            if (this.gameSize.vanguardMin < this.gameSize.vanguardSize) {
                this.battleVanguards.push(this.battleVanguard);
                this.gameSize.vanguardMin++;
            }
        } else if (input === "addFlag") {
            if (this.gameSize.flagMin < this.gameSize.flagSize) {
                this.battleFlags.push(this.battleFlag);
                this.gameSize.flagMin++;
            }
        } else if (input === "addPathfinder") {
            if (this.gameSize.pathfinderMin < this.gameSize.pathfinderSize) {
                this.battlePathfinders.push(this.battlePathfinder);;
                this.gameSize.pathfinderMin++;
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
    
    initBattleGoupes(game: GameSize) {
        this.battleFlags = [];
        this.battleLines = [];
        this.battlePathfinders = [];
        this.battleFlags = [];
        if (this.gameSize.lineMin != 0) {
            for (var i = 0; i < this.gameSize.lineMin; i++) {
                this.battleLines.push(this.battleLine);
            }    
        } 
        if (this.gameSize.pathfinderMin != 0) {
            for (var i = 0; i < this.gameSize.pathfinderMin; i++) {
                this.battlePathfinders.push(this.battlePathfinder);
            }    
        } 
        if (this.gameSize.vanguardMin != 0) {
            for (var i = 0; i < this.gameSize.vanguardMin; i++) {
                this.battleVanguards.push(this.battleVanguard);    
            }    
        } 
        if (this.gameSize.flagMin != 0) {
            for (var i = 0; i < this.gameSize.flagMin; i++) {
                this.battleFlags.push(this.battleFlag);    
            }    
        }   
    }
    
    loadBattleGroupeTypes() {
        for (let i of this.battleGroupes) {
            if (i.battleGroupeType.battleType == "LINE") {
                this.battleLine =  i;     
            } else if (i.battleGroupeType.battleType == "FLAG") {
                this.battleFlag =  i; 
            } else if (i.battleGroupeType.battleType == "VANGUARD") {
                this.battleVanguard =  i;
            } else if (i.battleGroupeType.battleType == "PATHFINDER") {
                this.battlePathfinder =  i; 
            } 
        }  
    }

    onItemSelected(selectedItem: GameSize) {
        this.gameSize = selectedItem;
        this.loadBattleGroupeTypes();
        if (this.gameSize != null) {
            this.initBattleGoupes(this.gameSize);
        } 
    }
    
    private onDrop(args) {
        let [e, el] = args;
        this.removeClass(e, 'shipContainer');
        e = e.parentNode;
        if ( e != null ) {
            if (this.hasClass(e, 'isEmpty')) {
                this.removeClass(e, 'isEmpty');
                this.addClass(e, 'isFilled');
            }
        }
    }
    
    private onDrag(args) {
        let [e, el] = args;
        e = e.parentNode;
        if ( e != null ) {
            if (this.hasClass(e, 'isFilled')) {
                this.removeClass(e, 'isFilled');
                this.addClass(e, 'isEmpty');
            }
        }
    }

    private removeClass(el: any, name: string) {
        if (this.hasClass(el, name)) {
          el.className = el.className.replace(name, '');
        }
    }
    
      private hasClass(el: any, name: string) {
        return (el.className.indexOf(name) > 1); 
      }

      private addClass(el: any, name: string) {
        if (!this.hasClass(el, name)) {
          el.className = el.className ? [el.className, name].join('') : name;
        }
      }
    
    open() {
        this.modal.open();
    }
        
}