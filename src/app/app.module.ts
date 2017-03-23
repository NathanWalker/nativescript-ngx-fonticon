import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// app
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';
TNSFontIconService.debug = true;

import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    NativeScriptModule,
    TNSFontIconModule.forRoot({
      'fa': './fonts/font-awesome.css',
      'ion': './fonts/ionicons.css'
    })
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
