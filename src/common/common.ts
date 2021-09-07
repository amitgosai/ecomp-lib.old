import { DbFields } from "../data/data";
import { AppValidations } from "../validations/validation";

export const screenSizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

export interface IScreenSize {
  screenSize: string | undefined; 
  isMobileScreen: boolean; 
  isTabletScreen: boolean; 
  isDesktopScreen: boolean; 
  setScreenSizeByPixels(pixel: number): void; 
}

export interface IApp {
  appName: string; 
  tagLine: string | null | undefined; 
}

export interface IAppResource {
  appId: string; 
  resourceName: string; 
}

export class ScreenSize implements IScreenSize {
  private _screenSize: string | undefined = '';

  constructor();
  constructor(screenSize?: string) {
    this._screenSize = screenSize;
  }

  public setScreenSizeByPixels(value: number) {
    if (value <= 599) {
      this._screenSize = screenSizes.xs;
    }
    if (value >= 600 && value <= 959) {
      this._screenSize = screenSizes.sm;
    }
    if (value >= 960 && value <= 1279) {
      this._screenSize = screenSizes.md;
    }
    if (value >= 1280 && value <= 1919) {
      this._screenSize = screenSizes.lg;
    }
    if (value >= 1920) {
      this._screenSize = screenSizes.xl;
    }
  }

  public get screenSize(): string | undefined {
    return this._screenSize;
  }

  public set screenSize(value: string | undefined) {
    this._screenSize = value;
  }

  public get isMobileScreen(): boolean {
    let _retVal: boolean = false;

    if (this._screenSize === screenSizes.xs) {
      _retVal = true;
    }
    return _retVal;
  }

  public get isTabletScreen(): boolean {
    let _retVal: boolean = false;

    if (this._screenSize === screenSizes.sm || this._screenSize === screenSizes.md) {
      _retVal = true;
    }

    return _retVal;
  }

  public get isDesktopScreen(): boolean {
    let _retVal: boolean = false;

    if (this._screenSize === screenSizes.lg || this._screenSize === screenSizes.xl) {
      _retVal = true;
    }

    return _retVal;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class App extends DbFields implements IApp {
  constructor() { super(); }
  public appName: string = ""; 
  public tagLine: string | null | undefined; 
}
// tslint:disable-next-line: max-classes-per-file
export class AppResource extends DbFields implements IAppResource {
  public appId: string = ""; 
  public resourceName: string = ""; 

  constructor(resourceName?: string, appId?: string) {
    super(); 
    if(AppValidations.isNullOrEmpty(appId)) {
      this.appId = appId!; 
    }
    if(AppValidations.isNullOrEmpty(resourceName)) {
      this.resourceName = resourceName!; 
    }
  }
}