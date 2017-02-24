import { NgModule, ModuleWithProviders } from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './src/app/pipes/fonticon.pipe';
import { TNSFontIconService, USE_STORE } from './src/app/services/fonticon.service';

// for manual imports
export * from './src/app/pipes/fonticon.pipe';
export * from './src/app/services/fonticon.service';

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

  static forRoot(providedConfig: any = {}): ModuleWithProviders {
    return {
      ngModule: TNSFontIconModule,
      providers: [
        TNSFontIconService,
        { provide: USE_STORE, useValue: providedConfig },
      ]
    };
  }
}
