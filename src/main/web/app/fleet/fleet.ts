import { Component } from './@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ShipService} from '../service/ship.service';

@Component({
    selector: 'fleet',
    templateUrl: 'app/fleet/fleet.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class FleetComponent {
        
}