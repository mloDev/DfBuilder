'use strict';

import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Routes} from '@angular/router';

import {HelloComponent} from './hello/hello.component';
import {Bootstrap4Component} from './bootstrap4/bootstrap4.component';
import {HomeComponent} from './home/home.component';
import { Navbar } from './navbar/navbar';
import { ROUTES } from './routes';

@Component({
    selector: 'my-app',
    template: '<navbar></navbar><router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [Navbar, ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@Routes(ROUTES)
export class AppComponent {
  public title = 'Angular2 Bootstrap4 Navbar';
}
