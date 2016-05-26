'use strict';

import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShipService {
	
	var endpoint_url:String = "https://restcountries.eu/rest/v1/region/"

    constructor(@Inject(Http) private http: Http) {}

    getShips() {
        return this.http.get(this.endpoint_url')
            .map((res:Response) => res.json());
    }
}