import { Type } from '@angular/core';
import { HeroComponent } from './hero/hero';
import { HomeComponent } from './home/home';
import { AboutUsComponent } from './home/about/about';
import { ContactComponent } from './home/contact/contact';
import { ShipComponent } from './ship/ship.component';
import { FleetComponent } from './fleet/fleet';

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
    constructor({path, component, title}?: {
        path?: string;
        component?: Type;
        title?: string;
        menuType?: MenuType;
    });
}

export const ROUTES: RouteInfo[] = [
  { path: '/', component: HomeComponent, title: "DropFleet Builder", menuType: MenuType.BRAND },
  { path: '/fleet', component: FleetComponent, title: "FLEET", menuType: MenuType.LEFT },
  { path: '/about', component: AboutUsComponent, title: "ABOUTUS", menuType: MenuType.RIGHT },
  { path: '/contact', component: ContactComponent, title: "CONTACT", menuType: MenuType.RIGHT },
  { path: '/ships', component: ShipComponent, title: "SHIPS", menuType: MenuType.RIGHT }
]