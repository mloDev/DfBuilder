'use strict';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ShipService} from '../service/ship.service';
import { Ship } from '../model/ship';
import { ShipTypePipe } from '../pipes/ship-type-pipe';
import { ShipFactionPipe } from '../pipes/ship-faction-pipe';
import { FactionSelector } from '../selector/faction-selector';

@Component({
    selector: 'ship-component',
    pipes: [ShipTypePipe, ShipFactionPipe ],
    templateUrl: 'app/ship/ship.component.html',
    providers: [ShipService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, FactionSelector]
})
export class ShipComponent implements OnInit {

    @Input() faction;
    
    ships: Ship [];

  constructor(
    private shipService: ShipService) { }

    
  getShips() {
    this.shipService
        .getShips()
        .then(ships => this.ships = ships);
  }
    
  ngOnInit() {
    this.getShips();
  }
}