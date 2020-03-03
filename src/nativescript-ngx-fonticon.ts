import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './pipes/fonticon.pipe';
import { TNSFontIconService, USE_STORE } from './services/fonticon.service';

@NgModule({
  declarations: [
    TNSFontIconPipe,
    TNSFontIconPurePipe
  ],
  exports: [
    TNSFontIconPipe,
    TNSFontIconPurePipe
  ]
})
export class TNSFontIconModule {

  constructor(fonticon: TNSFontIconService) {}
  
  static forRoot(providedConfig: any = {}): ModuleWithProviders<TNSFontIconModule> {
    return {
      ngModule: TNSFontIconModule,
      providers: [
        { provide: USE_STORE, useValue: providedConfig },
        TNSFontIconService
      ]
    };
  }
}
