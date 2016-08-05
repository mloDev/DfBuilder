import { Component, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ROUTES, MenuType, RouteInfo } from '../routes';
import {TranslateService, TranslatePipe} from 'ng2-translate';
import { Auth } from '../service/auth.service';

@Component({
  selector: 'navbar',
  pipes: [TranslatePipe],
  providers: [ Auth ],
  properties: ['routes'],
  templateUrl: 'app/navbar/navbar.html',
  styles: [
    `
    .nav-link {
      color: #eee !important;
    }
    `
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class Navbar {
  public menuItems: RouteInfo[];
    
  constructor(public translate: TranslateService, private auth: Auth) {
    this.menuItems = ROUTES;
        // use navigator lang if available
        var userLang = navigator.language.split('-')[0];
        userLang = /(de|en)/gi.test(userLang) ? userLang : 'en';

        // this trigger the use of the german or english language after setting the translations
        translate.use(userLang);
  }

  public getMenuItemClasses(menuItem: RouteInfo) {
    let menuItemClass = {
      "nav-item": menuItem.menuType === MenuType.LEFT || menuItem.menuType === MenuType.RIGHT,
      "pull-right": menuItem.menuType === MenuType.RIGHT
    }
    return menuItemClass;
  }

  public getMenuItemAnchorClasses(menuItem: RouteInfo) {
    let menuItemAnchorClass = {
      "navbar-brand": menuItem.menuType === MenuType.BRAND,
      "nav-link": menuItem.menuType === MenuType.LEFT || menuItem.menuType === MenuType.RIGHT
    }
    return menuItemAnchorClass;
  }
}