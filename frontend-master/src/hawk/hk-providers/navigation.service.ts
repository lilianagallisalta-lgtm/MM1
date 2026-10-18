import { Injectable } from '@angular/core';
import {App, Nav, NavController} from "ionic-angular";

@Injectable()
export class NavigationService {
  navs: Nav[] = [];
  _rootNav: Nav;
  _mainNav: Nav;
  history: Array<any> = [];

  private subPages: Array<string> = [];

  constructor(
    private app: App,
  ) { }

  push(page: string, params?: any) {
    if (this._rootNav
      && (! this._mainNav || this._mainNav.root != this._rootNav.root)
    ) {
      this._mainNav = this._rootNav;
    }

    this._log('push in nav:', this._mainNav);

    return this._mainNav
      .push(page, params)
      .catch((errors) => {
        console.error('Cant push page ' + page, errors);
        this.pushFallback(page, params)
      })
      .then(
        () => {},
        (errors) => {
          console.error('Cant push page ' + page, errors);
          this.pushFallback(page, params)
        }
      );
  }

  pushFallback(page: string, params?: any) {
    this._log('push fallback', page, params);
    this._mainNav = null;
    // return this.push(page, params);
  }

  register(nav: Nav) {
    this._mainNav = nav;

    if (! this._rootNav) {
      // Es el primer Nav que se registra.

      this._rootNav = nav;
    }

    this.navs.push(this._mainNav);
  }

  setRoot(page: string, params: any = {}) {
    // this._rootNav = null;
    return this.app.getRootNav().setRoot(page, params);
  }

  popToRoot() {
    this._log('pop');

    // Indica si estaba en una subpage.
    let wereInSubPage: boolean = false;

    if (this.subPages.length) {
      this.subPages = [];
      wereInSubPage = true;
    }

    if (this.app.getRootNav().canGoBack()) {
      this.app
        .getRootNav()
        .pop()
        .then(() => {
          this._mainNav = this._rootNav;

          if (wereInSubPage) {
            // Si estaba en una subpage se llama al método `_popMainNav()`, ya
            // que no es agarrado por `window.onpopstate`.
            // this._popMainNav();
          }
        });
    }
  }

  public _popMainNav() {
    this._log('subpages:', this.subPages);

    if (this.subPages.length) {
      this._log('has subpages');
      this.subPages.pop();
      return;
    }

    let currentNav: Nav = this.navs.pop();

    this._mainNav = this.navs.length > 1 ? this.navs.pop() : this._rootNav;

    // this._log('[pop main nav] new main nav: ', this._mainNav);
    // this._log('[pop main nav] navs:', this.navs);
  }

  pushSubPage(page: string, params?: any) {
    this._mainNav.push(page, params);
    this.subPages.push(page);
    this._log('subpages:', this.subPages);
  }

  _log(...args) {
    // console.debug('[navigation-service]', ...args);
  }
}

