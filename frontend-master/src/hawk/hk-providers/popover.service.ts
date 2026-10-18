import { Injectable } from '@angular/core';
import {PopoverController, PopoverOptions, Popover} from "ionic-angular";

export interface IPopoverOptions {
  component: string,
  data?: any,
  cssClass?: string,
  showBackdrop?: boolean,
  enableBackdropDismiss?: boolean,
}

@Injectable()
export class PopoverService {
  constructor (
    private popover: PopoverController,
  ) { }

  simple(popover: string, data: any = {}): Popover {
    return this.show(
      new PopoverBuilder()
        .create(popover, data)
        .get()
    );
  }

  show(options: IPopoverOptions, $event?: any): Popover {
    if (! options.data) {
      options.data = {};
    }

    if (! $event) {
      $event = {
        target: {
          getBoundingClientRect: () => {
            return {
              top: '0',
              left: '0',
            };
          },
        }
      };
    }

    options.data.ev = $event;

    let popover = this.create(
      options.component,
      options.data,
      options.cssClass,
      options.showBackdrop,
      options.enableBackdropDismiss
    );

    popover.present();

    return popover;
  }

  options(component: string, data: any = {}, $event, cssClass?: string) {
    let popoverOptions: PopoverOptions = {
      cssClass: cssClass,
    };

    let popover = this.popover.create(component, data, popoverOptions);

    popover.present({
      ev: $event,
    });

    return popover;
  }

  private create(component: string, data: any = {}, cssClass: string = '', showBackdrop: boolean = true, enableBackdropDismiss: boolean = true): Popover {
    let presentOptions: PopoverOptions = {};
    presentOptions.cssClass = cssClass;
    presentOptions.showBackdrop = showBackdrop;
    presentOptions.enableBackdropDismiss = enableBackdropDismiss;

    return this.popover.create(component, data, presentOptions);
  }
}

export interface IPopoverSize {
  height: number|string,
  width: number|string,
}

export class PopoverBuilder {
  xs: IPopoverSize = {
    height: 90,
    width: 90,
  };

  sm: IPopoverSize = {
    height: 80,
    width: 80,
  };

  md: IPopoverSize = {
    height: 80,
    width: 60,
  };

  lg: IPopoverSize = {
    height: 80,
    width: 50,
  };

  private _component: string;
  private _data: any = {};
  private _cssClass: string = 'hk-popover';
  private _showBackdrop: boolean = true;
  private _enableBackdropDismiss: boolean = false;

  create(component: string, data: any = {}): PopoverBuilder {
    this._component = component;
    this._data = data;

    return this;
  }

  size(heightPercent: number|string, widthPercent: number|string): PopoverBuilder {
    this.xs = {
      height: heightPercent,
      width: widthPercent,
    };

    return this;
  }

  sizeSm(heightPercent: number|string, widthPercent: number): PopoverBuilder {
    this.sm = {
      height: heightPercent,
      width: widthPercent,
    };

    return this;
  }

  sizeMd(heightPercent: number|string, widthPercent: number): PopoverBuilder {
    this.md = {
      height: heightPercent,
      width: widthPercent,
    };

    return this;
  }

  sizeLg(heightPercent: number|string, widthPercent: number): PopoverBuilder {
    this.lg = {
      height: heightPercent,
      width: widthPercent,
    };

    return this;
  }

  showBackdrop(show: boolean): PopoverBuilder {
    this._showBackdrop = show;
    return this;
  }

  enableBackdropDismiss(enable: boolean): PopoverBuilder {
    this._enableBackdropDismiss = enable;
    return this;
  }

  addCssClass(cssClass: string): PopoverBuilder {
    this._cssClass += ' ' + cssClass;
    return this;
  }

  private setSizes() {
    this.addCssClass(` popover-${this.xs.height}-${this.xs.width}`);
    this.addCssClass(` popover-gt-sm-${this.sm.height}-${this.sm.width}`);
    this.addCssClass(` popover-gt-md-${this.md.height}-${this.md.width}`);
    this.addCssClass(` popover-gt-lg-${this.lg.height}-${this.lg.width}`);
  }

  get(): IPopoverOptions {
    this.setSizes();

    return {
      component: this._component,
      data: this._data,
      cssClass: this._cssClass,
      showBackdrop: this._showBackdrop,
      enableBackdropDismiss: this._enableBackdropDismiss
    };
  }
}

