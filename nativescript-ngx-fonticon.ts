import { NgModule, ModuleWithProviders} from '@angular/core';
import { TNSFontIconPipe, TNSFontIconPurePipe } from './src/app/pipes/fonticon.pipe';
import { TNSFontIconService } from './src/app/services/fonticon.service';

// for manual imports
export * from './src/app/pipes/fonticon.pipe';
export * from './src/app/services/fonticon.service';

const PIPES: Array<any> = [
  TNSFontIconPipe,
  TNSFontIconPurePipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class TNSFontIconModule {

  static forRoot(providedConfig: any): ModuleWithProviders {
    TNSFontIconService.config = providedConfig;
    return {
      ngModule: TNSFontIconModule,
      providers: [TNSFontIconService]
    };
  }
}
