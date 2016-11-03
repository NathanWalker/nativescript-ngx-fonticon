// angular
import {Injectable} from '@angular/core';

// nativescript
import {knownFolders} from 'file-system';

// libs
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TNSFontIconService {
  public static config: any = {};
  public static debug: boolean = false;
  public filesLoaded: BehaviorSubject<any>;
  public css: any = {}; // font icon collections containing maps of classnames to unicode
  private _currentName: string; // current collection name

  constructor() {
    this.filesLoaded = new BehaviorSubject(null);
    this.loadCss();
  }

  public loadCss(): void {
    let cnt = 0;
    let fontIconCollections = Object.keys(TNSFontIconService.config);
    if (TNSFontIconService.debug) {
      console.log(`Collections to load: ${fontIconCollections}`);
    }

    let initCollection = () => {
      this._currentName = fontIconCollections[cnt];
      this.css[this._currentName] = {};
    };

    let loadFiles = () => {
      initCollection();
      if (cnt === fontIconCollections.length) {
        this.filesLoaded.next(this.css);
      } else {
        this.loadFile(TNSFontIconService.config[this._currentName]).then(() => {
          cnt++;
          loadFiles();
        });
      }
    };

    loadFiles();
  }

  private loadFile(path: string): Promise<any> {
    if (TNSFontIconService.debug) {
      console.log(`----------`);
      console.log(`Loading collection '${this._currentName}' from file: ${path}`);
    }
    let cssFile = knownFolders.currentApp().getFile(path);
    return new Promise((resolve, reject) => {
      cssFile.readText().then((data) => {
        this.mapCss(data);
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  private mapCss(data: any): void {
    let sets = data.split('}');
    let cleanValue = (val) => {
      let v = val.split('content:')[1].toLowerCase().replace(/\\e/, '\\ue').replace(/\\f/, '\\uf').trim().replace(/\"/g, '').replace(/;/g, '');
      return v;
    };

    for (let set of sets) {
      let pair = set.replace(/ /g, '').split(':before{');
      let keyGroups = pair[0];
      let keys = keyGroups.split(',');
      if (pair[1]) {
        let value = cleanValue(pair[1]);
        for (let key of keys) {
          key = key.trim().slice(1).split(':before')[0];
          this.css[this._currentName][key] = String.fromCharCode(parseInt(value.substring(2), 16));
          if (TNSFontIconService.debug) {
            console.log(`${key}: ${value}`);
          }
        }
      }
    }
  }
}
