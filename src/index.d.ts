import { ModuleWithProviders } from "@angular/core";
import { TNSFontIconService } from "./services/fonticon.service";
import * as i0 from "@angular/core";
import * as i1 from "./pipes/fonticon.pipe";
export * from './pipes/fonticon.pipe';
export * from './services/fonticon.service';
export declare class TNSFontIconModule {
    constructor(fonticon: TNSFontIconService);
    static forRoot(providedConfig?: any): ModuleWithProviders<TNSFontIconModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<TNSFontIconModule, [typeof i1.TNSFontIconPipe, typeof i1.TNSFontIconPurePipe], never, [typeof i1.TNSFontIconPipe, typeof i1.TNSFontIconPurePipe]>;
    static ɵinj: i0.ɵɵInjectorDef<TNSFontIconModule>;
}
