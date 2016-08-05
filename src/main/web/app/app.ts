import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Auth }  from './service/auth.service';



@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [ Footer, Navbar, ROUTER_DIRECTIVES ]

})
    
export class AppComponent {
        
  public title = 'Df Builder';
  constructor(private auth: Auth) {}
}
