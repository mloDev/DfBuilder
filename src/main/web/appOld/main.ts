'use strict';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router';

import {AppComponent} from './app.component';

bootstrap( AppComponent, [ ROUTER_PROVIDERS ] );
