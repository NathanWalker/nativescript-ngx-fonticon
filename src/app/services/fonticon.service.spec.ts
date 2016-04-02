import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  beforeEach,
  beforeEachProviders
} from 'angular2/testing';

import {provide} from 'angular2/core';
import {TNSFontIconService} from './fonticon.service';

import * as app from 'application';
import * as dialogs from 'ui/dialogs';

class AppMock {
  public get android() {
    return false;
  }
  public get ios() {
    return true;
  }
}
class DialogMock {
  public get android() {
    return false;
  }
  public get ios() {
    return true;
  }
}

describe('TNSFontIconService', () => {

  beforeEach(() => {
    spyOn(dialogs, 'alert');
  });  
  beforeEachProviders(() => {
    return [
      provide(app, { useClass: AppMock }),
      provide(dialogs, { useClass: DialogMock }),
      TNSFontIconService
    ]
  });

  it('should alert message', injectAsync([TNSFontIconService], (plugin:TNSFontIconService) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(dialogs.alert).toHaveBeenCalledWith('');
      }, 2200);
    });
  }));

});
