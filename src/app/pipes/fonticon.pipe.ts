import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef} from 'angular2/core';
import {isPresent} from "angular2/src/facade/lang";

import {TNSFontIconService} from '../services/fonticon.service';

@Pipe({
  name: 'fonticon',
  pure: false
})
export class TNSFontIconPipe implements PipeTransform, OnDestroy {
  private value: '';
  private iconSub: any;

  constructor(private fonticon: TNSFontIconService, private _ref: ChangeDetectorRef) {}

  transform(className: string, args: any[]) {
    let collectionName: string;

    if (args.length && args[0] !== null) {
      collectionName = args[0];      
    } else {
      // font collection name is required
      return this.value;
    }

    // if there is a subscription to iconSub, clean it
    this._dispose();

    this.iconSub = this.fonticon.filesLoaded.subscribe((data: any) => {
      if (data[collectionName] && data[collectionName][className]) {
        this.value = data[collectionName][className];
        this._ref.markForCheck();
      }
    });

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
