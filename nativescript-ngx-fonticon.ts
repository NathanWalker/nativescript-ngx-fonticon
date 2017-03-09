import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './src/app/pipes/fonticon.pipe';
import { TNSFontIconService, FONT_ICON_CONFIG } from './src/app/services/fonticon.service';

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
        { provide: FONT_ICON_CONFIG, useValue: providedConfig },
        TNSFontIconService
      ]
    };
  }
}
