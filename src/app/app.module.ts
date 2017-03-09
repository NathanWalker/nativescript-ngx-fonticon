import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// app
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';
TNSFontIconService.debug = true;

import { AppComponent } from "./app.component";

export const icons = function () {
  return {
    'fa': './assets/font-awesome.css',
    'ion': './assets/ionicons.css'
  };
};

@NgModule({
  imports: [
    NativeScriptModule,
    TNSFontIconModule.forRoot(icons)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
