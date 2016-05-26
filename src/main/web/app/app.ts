import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { Routes , ROUTER_DIRECTIVES, Router} from '@angular/router';
import { Navbar } from './navbar/navbar';
import { ROUTES } from './routes';
import { Footer } from './footer/footer';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [ Footer, Navbar, ROUTER_DIRECTIVES ]

})
@Routes(ROUTES)
export class AppComponent {
  public title = 'Angular2 Bootstrap4 Navbar';
  constructor(private router:Router) {}
}
