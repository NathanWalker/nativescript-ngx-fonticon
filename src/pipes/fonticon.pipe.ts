import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef} from '@angular/core';

import {TNSFontIconService} from '../services/fonticon.service';

@Pipe({
  name: 'fonticon',
  pure: false
})
export class TNSFontIconPipe implements PipeTransform, OnDestroy {
  private _collectionName: string;
  private _value: '';
  private _iconSub: any;

  constructor(private fonticon: TNSFontIconService, private _ref: ChangeDetectorRef) { }

  transform(className: string, args?: any[]) {
    if (!this._collectionName)
      this._collectionName = getCollectionName(className, args);

    if (!this._value || (this.fonticon.css && this.fonticon.css[this._collectionName] && this._value !== this.fonticon.css[this._collectionName][className])) {
      // only subscribe if value is changing
      // if there is a subscription to iconSub, clean it
      this._dispose();

      this._iconSub = this.fonticon.filesLoaded.subscribe((data: any) => {
        if (data && data[this._collectionName] && data[this._collectionName][className]) {
          if (this._value !== data[this._collectionName][className]) {
            // only markForCheck if value has changed
            this._value = data[this._collectionName][className];
            this._ref.markForCheck();  
            this._dispose();
          }
        }
      });  
    }

    return this._value;
  }

  _dispose(): void {
    if (this._iconSub) {
      this._iconSub.unsubscribe();
      this._iconSub = undefined;
    }
  }  

  ngOnDestroy(): void {
    this._dispose();
  }  
}

// Can be used for optimal performance, however requires usage of Observable values with the async pipe, see demo (app.ts) for example
@Pipe({
  name: 'fonticonPure'
})
export class TNSFontIconPurePipe implements PipeTransform {
  private _collectionName: string;

  constructor(private fonticon: TNSFontIconService) { }

  transform(className: string, args?: any[]) {
    if (!this._collectionName)
      this._collectionName = getCollectionName(className, args);
    
    // console.log(`fonticonPure: ${className}`);
    if (this.fonticon.css && this.fonticon.css[this._collectionName]) {
      return this.fonticon.css[this._collectionName][className];
    } else {
      return '';
    } 
  } 
}

function getCollectionName(className: string, args: any[]): string {
  if (args && args.length && args[0] !== null) {
    return args[0];
  } else if (className && typeof className === 'string' && className.indexOf('-') > -1) {
    // derive from classname
    return className.split('-')[0];
  } else {
    return '';
  }
}
