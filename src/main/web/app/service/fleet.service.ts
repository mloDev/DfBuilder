'use strict';

import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CONFIGURATION} from '../app.const';
import { Fleet } from '../model/fleet';

@Injectable()
export class FleetService {
    
    private actionUrl: string;

    constructor(@Inject(Http) private http: Http) {
            this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl;
    }

    getFleets(): Promise<Fleet[]> {
        return this.http.get(this.actionUrl +
            CONFIGURATION.baseUrls.fleet).toPromise()
               .then(response => response.json());
    }
    
    getFleetsByUserId(userId: string): Promise<Fleet[]> {
        console.log(this.actionUrl + CONFIGURATION.baseUrls.fleetByUserId);
        console.log(userId);
        return this.http.get(this.actionUrl +
            CONFIGURATION.baseUrls.fleetByUserId + "/" + userId).toPromise()
               .then(response => response.json());
    }
    
    saveFleet(fleet: Fleet): Promise<Fleet> {
        if (fleet.id) {
            return this.put(fleet);    
        }
        return this.post(fleet);
    } 
    
    post(fleet: Fleet): Promise<Fleet> {
        let headers = new Headers({
            'Content-Type': 'application/json'});
        
        return this.http
                   .post(this.actionUrl + CONFIGURATION.baseUrls.fleet, JSON.stringify(fleet), {headers: headers})
                   .toPromise()
                   .then(response => response.json())
                   .catch(this.handleError);
    }
    
    put(fleet: Fleet) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
    
        let url = `${this.actionUrl + CONFIGURATION.baseUrls.fleet}/${fleet.id}`;
        
        return this.http
               .put(url, JSON.stringify(fleet), {headers: headers})
               .toPromise()
               .then(() => fleet)
               .catch(this.handleError);
    } 
    
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}