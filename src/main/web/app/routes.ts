import { Type } from '@angular/core';
import { HomeComponent } from './home/home';
import { AboutUsComponent } from './home/about/about';
import { ContactComponent } from './home/contact/contact';
import { ShipComponent } from './ship/ship.component';
import { FleetComponent } from './fleet/fleet';
import { provideRouter, RouterConfig} from '@angular/router';
import { AuthGuardAdmin, AuthGuardUser } from './guards/auth.guard';
import { UnauthorizedComponent } from './errorPages/unauthorized.component';

export enum MenuType {
  BRAND,
  LEFT,
  RIGHT
}

interface RouteInfoMetadata {
  path: string;
  component: Type;
  title: string;
  menuType: MenuType;
}

/**
 *  RouteInfo
 */
export declare class RouteInfo implements RouteInfoMetadata {
    path: string;
    component: Type;
    title: string;
    menuType: MenuType;
    accessType: string;
    constructor({path, component, title}?: {
        path?: string;
        component?: Type;
        title?: string;
        menuType?: MenuType;
        accessType: string;
    });
}

export const ROUTES: RouteInfo[] = [
  { path: '', component: HomeComponent, title: "DropFleet Builder", menuType: MenuType.BRAND, accessType: "GUEST"},
  { path: 'fleet', component: FleetComponent, title: "FLEET", menuType: MenuType.LEFT, accessType: "GUEST"},
  { path: 'about', component: AboutUsComponent, title: "ABOUTUS", menuType: MenuType.RIGHT, accessType: "GUEST" },
  { path: 'contact', component: ContactComponent, title: "CONTACT", menuType: MenuType.RIGHT, accessType: "GUEST" },
  { path: 'ships', component: ShipComponent, title: "SHIPS", menuType: MenuType.RIGHT, accessType: "ADMIN" }
];

export const route: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'fleet', component: FleetComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'ships', component: ShipComponent, canActivate: [AuthGuardAdmin] },
  { path: 'fleetList', component: ShipComponent, canActivate: [AuthGuardUser] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: ''}
];

export const appRouterProviders = [
    
    AuthGuardAdmin,
    AuthGuardUser,
    provideRouter(route)
];