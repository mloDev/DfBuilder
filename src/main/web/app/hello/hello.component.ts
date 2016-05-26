'use strict';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HelloService} from './hello.service';
import { GameSize } from './gameSize';

@Component({
    selector: 'test',
    templateUrl: 'app/hello/hello.component.html',
    providers: [HelloService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HelloComponent implements OnInit {

  gameSizes: GameSize[];

  constructor(
    private helloService: HelloService) { }

  getGameSizes() {
    this.helloService
        .getGameSizes()
        .then(gameSizes => this.gameSizes = gameSizes); // TODO: Display error message
  }
    
  ngOnInit() {
    this.getGameSizes();
  }
}
