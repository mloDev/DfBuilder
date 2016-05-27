import { Component } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {GameSizeService} from '../service/gameSize.service';
import { GameSize } from '../model/gameSize';

@Component({
    selector: 'fleet',
    templateUrl: 'app/fleet/fleet.html',
    providers: [GameSizeService], 
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class FleetComponent {
        
      constructor(
    private gameSizeService: GameSizeService) { }
        
    gameSize: GameSize;
    
    getGameSize(id: number) {
        this.gameSizeService.getGameSize(id).then(gameSize => this.gameSize = gameSize);
    }
       
    ngOnInit(){
        this.getGameSize(1); 
    }
}