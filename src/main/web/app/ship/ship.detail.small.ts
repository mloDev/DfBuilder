'use strict';
import { Component, Input } from '@angular/core';
import { Ship } from "../model/ship";
@Component({
    selector: 'ship-detail-small',
    templateUrl: 'app/ship/ship.detail.small.html'
})
export class ShipDetailSmall {
    
    @Input() ship: Ship;

}