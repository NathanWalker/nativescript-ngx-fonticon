// angular
import { Injectable, Inject, InjectionToken } from "@angular/core";

// nativescript
import { knownFolders } from "@nativescript/core";

// libs
import { BehaviorSubject } from "rxjs";

export const USE_STORE = new InjectionToken<any>("USE_STORE");

@Injectable({
  providedIn: 'root'
})
export class TNSFontIconService {
  static debug: boolean = false;
  filesLoaded: BehaviorSubject<any>;
  css: any = {}; // font icon collections containing maps of classnames to unicode
  private _currentName: string; // current collection name

  constructor(@Inject(USE_STORE) private config: any) {
    this.filesLoaded = new BehaviorSubject(null);
    this.loadCss();
  }

  loadCss() {
    let cnt = 0;
    let fontIconCollections = Object.keys(this.config);
    if (TNSFontIconService.debug) {
      console.log(`Collections to load: ${fontIconCollections}`);
    }

    let initCollection = () => {
      this._currentName = fontIconCollections[cnt];
      this.css[this._currentName] = {};
    };

    let loadData = () => {
      initCollection();
      if (cnt === fontIconCollections.length) {
        this.filesLoaded.next(this.css);
      } else {
        let fonts: any = this.config;
        this.loadCssData(this._currentName).then(() => {
          cnt++;
          loadData();
        });
      }
    };

    loadData();

    // Legacy flow
    // let loadFiles = () => {
    //   initCollection();
    //   if (cnt === fontIconCollections.length) {
    //     this.filesLoaded.next(this.css);
    //   } else {
    //     let fonts: any = this.config;
    //     this.loadFile(fonts[this._currentName]).then(() => {
    //       cnt++;
    //       loadFiles();
    //     });
    //   }
    // };
  }

  // In bundled NativeScript, don't try to load the file data in the plugin.
  // Instead, initialize the config data with a key value pair where
  // the file data is in the value, so all we need to do is parse the
  // file data.
  loadCssData(configKey): Promise<any> {
    if (TNSFontIconService.debug) {
      console.log("----------");
      console.log(
        "Loading collection '" +
          this._currentName +
          "' from config key name: " +
          configKey
      );
    }
    return new Promise((resolve, reject) => {
      try {
        var cssData = this.config[configKey];
        this.mapCss(cssData);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  // Legacy flow for pre NS6
  private loadFile(path: string): Promise<any> {
    if (TNSFontIconService.debug) {
      console.log(`----------`);
      console.log(
        `Loading collection '${this._currentName}' from file: ${path}`
      );
    }
    let cssFile = knownFolders.currentApp().getFile(path);
    return new Promise((resolve, reject) => {
      cssFile.readText().then(
        (data: any) => {
          this.mapCss(data);
          resolve();
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  private mapCss(data: any): void {
    let sets = data.split("}");
    var mappedCss = "";
    let cleanValue = (val: string) => {
      let v = val
        .split("content:")[1]
        .toLowerCase()
        .replace(/\\e/, "\\ue")
        .replace(/\\f/, "\\uf")
        .trim()
        .replace(/\"/g, "")
        .replace(/;/g, "");
      return v;
    };

    for (let set of sets) {
      let pair = set.replace(/ /g, "").split(":before{");
      let keyGroups = pair[0];
      let keys = keyGroups.split(",");
      if (pair[1]) {
        let value = cleanValue(pair[1]);
        for (let key of keys) {
          key = key
            .trim()
            .slice(1)
            .split(":before")[0];
          this.css[this._currentName][key] = String.fromCharCode(
            parseInt(value.substring(2), 16)
          );
          if (TNSFontIconService.debug) {
            mappedCss += `${key}: ${value}\n`;
          }
        }
      }
    }

    if (TNSFontIconService.debug) {
      console.log(`mapped css:\n${mappedCss}`);
    }
  }
}
