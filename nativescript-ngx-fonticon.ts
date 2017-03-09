import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './src/app/pipes/fonticon.pipe';
import { TNSFontIconService, USE_STORE } from './src/app/services/fonticon.service';

// for manual imports
export * from './src/app/pipes/fonticon.pipe';
export * from './src/app/services/fonticon.service';

export class TNSFontIconModuleModuleConfig {
    fonts?: Provider
}

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

  static forRoot(providedConfig: TNSFontIconModuleModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TNSFontIconModule,
      providers: [
        { provide: USE_STORE, useValue: providedConfig },
        TNSFontIconService
      ]
    };
  }
}
