'use strict';

import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CONFIGURATION} from '../app.const';
import { BattleGroupe } from '../model/battleGroupe';

@Injectable()
export class BattleGroupeService {
    
    private actionUrl: string;

    constructor(@Inject(Http) private http: Http) {
            this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            CONFIGURATION.baseUrls.battlegroupe;
    }

    getBattleGroupes(): Promise<BattleGroupe[]> {
        return this.http.get(this.actionUrl).toPromise()
               .then(response => response.json());
    }
}