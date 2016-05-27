'use strict';

import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CONFIGURATION} from '../app.const';
import { GameSize } from '../model/gameSize';

@Injectable()
export class GameSizeService {

    private actionUrl: string;
    
    constructor(@Inject(Http) private http: Http) {
        
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            CONFIGURATION.baseUrls.gameSizes;
    }

    getGameSizes(): Promise<GameSize[]> {
        return this.http.get(this.actionUrl).toPromise()
               .then(response => response.json());
        
    }
    
    getGameSize(id: number): GameSize {
        return this.getGameSizes().then(gameSizes => gameSizes.filter(gameSize => gameSize.id === id)[0]);
    }
}