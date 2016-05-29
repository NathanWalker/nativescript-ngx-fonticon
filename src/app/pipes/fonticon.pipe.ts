import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {isPresent} from "@angular/core/src/facade/lang";

import {TNSFontIconService} from '../services/fonticon.service';

@Pipe({
  name: 'fonticon',
  pure: false
})
export class TNSFontIconPipe implements PipeTransform, OnDestroy {
  private value: '';
  private iconSub: any;

  constructor(private fonticon: TNSFontIconService, private _ref: ChangeDetectorRef) { }

  transform(className: string, args: any[]) {
    let collectionName: string;
    if (args && args.length && args[0] !== null) {
      collectionName = args[0];
    } else if (className && className.indexOf('-') > -1) {
      // derive from classname
      collectionName = className.split('-')[0];
    } else {      
      // font collection name is required
      return this.value;
    }

    if (!this.value || (this.fonticon.css && this.fonticon.css[collectionName] && this.value !== this.fonticon.css[collectionName][className])) {
      // only subscribe if value is changing
      // if there is a subscription to iconSub, clean it
      this._dispose();

      this.iconSub = this.fonticon.filesLoaded.subscribe((data: any) => {
        if (data && data[collectionName] && data[collectionName][className]) {
          if (this.value !== data[collectionName][className]) {
            // only markForCheck is value has changed
            this.value = data[collectionName][className];
            this._ref.markForCheck();  
          }
        }
      });  
    }

    return this.value;
  }

  _dispose(): void {
    if (isPresent(this.iconSub)) {
      this.iconSub.unsubscribe();
      this.iconSub = undefined;
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

  constructor(private fonticon: TNSFontIconService) { }

  transform(className: string, args: any[]) {
    let collectionName: string;
    if (args && args.length && args[0] !== null) {
      collectionName = args[0];
    } else if (className && className.indexOf('-') > -1) {
      // derive from classname
      collectionName = className.split('-')[0];
    } 

    if (this.fonticon.css && this.fonticon.css[collectionName]) {
      return this.fonticon.css[collectionName][className];
    } else {
      return '';
    } 
  } 
}
