'use strict';

import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CONFIGURATION} from '../app.const';
import { BattleGroupe } from '../model/battleGroupe';
import { BattleGroupeType } from '../model/battleGroupeType';

@Injectable()
export class BattleGroupeService {
    
    private actionUrl: string;

    constructor(@Inject(Http) private http: Http) {
            this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl;
    }

    getBattleGroupes(): Promise<BattleGroupe[]> {
        return this.http.get(this.actionUrl +
            CONFIGURATION.baseUrls.battlegroupe).toPromise()
               .then(response => response.json());
    }
    
    getBattleGroupeTypes(): Promise<BattleGroupeType[]> {
        return this.http.get(this.actionUrl +
            CONFIGURATION.baseUrls.battlegroupeType).toPromise()
               .then(response => response.json());
    }
    
    saveBattleGroupe(battleGroupe: BattleGroupe): Promise<BattleGroupe> {
        if (battleGroupe.id) {
            return this.put(battleGroupe);    
        }
        return this.post(battleGroupe);
    } 
    
    post(battleGroupe: BattleGroupe): Promise<BattleGroupe> {
        let headers = new Headers({
            'Content-Type': 'application/json'});
        
        return this.http
                   .post(this.actionUrl + CONFIGURATION.baseUrls.battlegroupe, JSON.stringify(battleGroupe), {headers: headers})
                   .toPromise()
                   .then(response => response.json())
                   .catch(this.handleError);
    }
    
    put(battleGroupe: BattleGroupe) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
    
        let url = `${this.actionUrl + CONFIGURATION.baseUrls.battlegroupe}/${battleGroupe.id}`;
        
        return this.http
               .put(url, JSON.stringify(battleGroupe), {headers: headers})
               .toPromise()
               .then(() => battleGroupe)
               .catch(this.handleError);
    } 
    
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}