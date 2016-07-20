'use strict';
import { Component, Input } from '@angular/core';
import { Ship } from "../model/ship";
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'ship-detail-small',
    templateUrl: 'app/ship/ship.detail.small.html',
    directives: [ TOOLTIP_DIRECTIVES ],
})
export class ShipDetailSmall {
    
    @Input() ship: Ship;

}