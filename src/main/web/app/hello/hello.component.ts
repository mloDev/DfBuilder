'use strict';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HelloService} from './hello.service';
import { GameSize } from './gameSize';
import {ShipService} from '../service/ship.service';
import { Ship } from '../model/ship';

@Component({
    selector: 'test',
    templateUrl: 'app/hello/hello.component.html',
    providers: [HelloService, ShipService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HelloComponent implements OnInit {

  gameSizes: GameSize[];
    ships: Ship [];

  constructor(
    private helloService: HelloService,
    private shipService: ShipService) { }

  getGameSizes() {
    this.helloService
        .getGameSizes()
        .then(gameSizes => this.gameSizes = gameSizes); // TODO: Display error message
  }
    
  getShips() {
    this.shipService
        .getShips()
        .then(ships => this.ships = ships);
  }
    
  ngOnInit() {
    this.getGameSizes();
      this.getShips();
      console.log(this.gameSizes);
  }
}
