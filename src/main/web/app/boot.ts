import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { AppComponent } from './app';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { FORM_PROVIDERS } from '@angular/common';

bootstrap( AppComponent, [
    provide(APP_BASE_HREF, {useValue: '/#'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          tokenName: 'jwt'
        }), http);
      },
      deps: [Http]
    }),
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS ] );