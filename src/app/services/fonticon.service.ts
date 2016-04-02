// angular
import {Injectable} from 'angular2/core';

// nativescript
import {knownFolders} from 'file-system';

// libs
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class TNSFontIconService {
  private _css: any = {}; // font icon classnames to unicode
  private _paths: any; // file paths to font icon collections
  private _currentName: string; // current collection name

  constructor(paths: any) {
    this._paths = paths;
  }

  public getCss(name: string): Observable<any> {
    this._currentName = name;
    if (!this._css[name]) {
      this._css[name] = {};
      
      let cnt = 0;
      let fontIconCollections = Object.keys(this._paths);
      let currentCollectionKey = fontIconCollections[cnt];

      return Observable.fromPromise(new Promise((resolve, reject) => {
        let loadFiles = () => {
          if (cnt === fontIconCollections.length) {
            resolve(this._css[name]);
          } else {
            this.loadFile(this._paths[currentCollectionKey]).then(() => {
              cnt++;
              currentCollectionKey = fontIconCollections[cnt];
              loadFiles();
            });
          }
        };

        loadFiles();         
      }));
      
    } else {
      return Observable.of(this._css[name]);
    }
  }

  private loadFile(path: string): Promise<any> {
    let cssFile = knownFolders.currentApp().getFile(path);
    return new Promise((resolve, reject) => {
      cssFile.readText().then((data) => {
        try {
          this.mapCss(data);
          resolve();
        } catch (err) {
          reject(err);         
        }
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
      let value = cleanValue(pair[1]);
      for (let key of keys) {
        key = key.trim().slice(1).split(':before')[0];
        this._css[this._currentName][key] = value;
        console.log(`${key}: ${value}`);
      }
    }
  }  
}
