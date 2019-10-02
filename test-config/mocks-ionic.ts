import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Config } from 'ionic-angular';

export class PlatformMock {
  ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  getQueryParam() {
    return true;
  }

  registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  doc(): HTMLDocument {
    return document;
  }

  is(): boolean {
    return true;
  }

  getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  onResize(callback: any) {
    return callback;
  }

  registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  win(): Window {
    return window;
  }

  raf(callback: any): number {
    return 1;
  }

  timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  cancelTimeout(id: any) {
    // do nothing
  }

  getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {

  pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  setRoot(): any {
    return true;
  }

  registerChildNav(nav: any): void {
    return;
  }

}

export class DeepLinkerMock {

}

export class LoadingMock {
  public create(): any {
    return new LoadingMock();
  }

  public dismiss(): any { }

  public present(): any { }
}