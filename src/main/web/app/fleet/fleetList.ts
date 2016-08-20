import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, Injectable } from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { TOOLTIP_DIRECTIVES } from 'ng2-tooltip';
import { Auth } from '../service/auth.service';

import {TranslateService, TranslatePipe} from 'ng2-translate';

import { Fleet } from "../model/fleet";
import { FleetService } from '../service/fleet.service';

@Component({
    selector: 'fleet',
    pipes: [TranslatePipe],
    templateUrl: 'app/fleet/fleetList.html',
    directives: [ TOOLTIP_DIRECTIVES, ROUTER_DIRECTIVES ],
    providers: [ FleetService, Auth ]

})
    
export class FleetListComponent {
    
    private fleets: Fleet[] = [];
    
    constructor(
        private fleetService: FleetService,  
        public translate: TranslateService, private auth: Auth) {}
    
    getFleetsForUser() {
        this.fleetService
            .getFleetsByUserId(this.auth.userProfile.user_id)
            .then(fleets => this.fleets = fleets);    
    }
    
    ngOnInit(){
        this.getFleetsForUser();
    }
}