import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './src/app/pipes/fonticon.pipe';
import { TNSFontIconService } from './src/app/services/fonticon.service';

// for manual imports
export * from './src/app/pipes/fonticon.pipe';
export * from './src/app/services/fonticon.service';

let config: any;
export const iconConfig = function () {
  return new TNSFontIconService(config);
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

  static forRoot(providedConfig: any): ModuleWithProviders {
    config = providedConfig;
    return {
      ngModule: TNSFontIconModule,
      providers: [
        { provide: TNSFontIconService, useFactory: (iconConfig) }
      ]
    };
  }
}
