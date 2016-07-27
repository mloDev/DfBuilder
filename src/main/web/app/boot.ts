import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { AppComponent } from './app';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { FORM_PROVIDERS } from '@angular/common';
import { FactionSelector } from './selector/faction-selector';
import { NgForNumber } from "./pipes/ngForNumber-pipe";
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';
import {TRANSLATE_PROVIDERS} from 'ng2-translate';

bootstrap( AppComponent, [
    provide(APP_BASE_HREF, {useValue: '/'}),
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
    DND_PROVIDERS,
    HTTP_PROVIDERS,
    TRANSLATE_PROVIDERS,
    FactionSelector,
    NgForNumber ] );