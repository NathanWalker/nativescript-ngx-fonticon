// angular
import {Injectable} from '@angular/core';

// nativescript
import {knownFolders} from 'file-system';

// libs
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TNSFontIconService {
  public filesLoaded: BehaviorSubject<any>;
  private _css: any = {}; // font icon collections containing maps of classnames to unicode
  private _paths: any; // file paths to font icon collections
  private _currentName: string; // current collection name
  private _debug: boolean = false;
  
  constructor(paths: any, debug?: boolean) {
    this._paths = paths;
    this._debug = debug;
    this.filesLoaded = new BehaviorSubject(this._css);
    this.loadCss();
  }

  public loadCss(): void {
    let cnt = 0;
    let fontIconCollections = Object.keys(this._paths);
    if (this._debug) {
      console.log(`Collections to load: ${fontIconCollections}`);
    }

    let initCollection = () => {
      this._currentName = fontIconCollections[cnt];
      this._css[this._currentName] = {};
    }; 
    
    let loadFiles = () => {
      initCollection();
      if (cnt === fontIconCollections.length) {
        this.filesLoaded.next(this._css);
      } else {
        this.loadFile(this._paths[this._currentName]).then(() => {
          cnt++;
          loadFiles();
        });
      }
    };

    loadFiles();         
  }

  private loadFile(path: string): Promise<any> {
    if (this._debug) {
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
      let v = val.split('content:')[1].replace(/\\f/, '\\uf').trim().replace(/\"/g, '').slice(0, -1);
      return v;
    };

    for (let set of sets) {
      let pair = set.split(':before {');
      let keyGroups = pair[0];
      let keys = keyGroups.split(',');
      if (pair[1]) {
        let value = cleanValue(pair[1]);
        for (let key of keys) {
          key = key.trim().slice(1).split(':before')[0];
          this._css[this._currentName][key] = String.fromCharCode(parseInt(value.substring(2), 16));
          if (this._debug) {
            console.log(`${key}: ${value}`);
          }
        }
      }
    }
  }  
}
