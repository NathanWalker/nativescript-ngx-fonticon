// for standard export at bottom
import {TNSFontIconPipe, TNSFontIconPurePipe} from './src/app/pipes/fonticon.pipe';
import {TNSFontIconService} from './src/app/services/fonticon.service';

// for manual imports
export * from './src/app/pipes/fonticon.pipe';
export * from './src/app/services/fonticon.service';

// provides standard for consumption via things like angular-cli
export default {
  pipes: [TNSFontIconPipe, TNSFontIconPurePipe],
  providers: [TNSFontIconService]
}
