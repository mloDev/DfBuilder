'use strict';
import { Component, Input, ViewChild } from '@angular/core';
import { Ship } from "../model/ship";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { TOOLTIP_DIRECTIVES } from 'ng2-tooltip';

@Component({
    selector: 'ship-detail-small',
    templateUrl: 'app/ship/ship.detail.small.html',
    directives: [ TOOLTIP_DIRECTIVES, MODAL_DIRECTIVES ],
})
export class ShipDetailSmall {
    
    @Input() ship: Ship;
    
    @ViewChild('modal')
    modal: ModalComponent;

}