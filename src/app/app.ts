import 'reflect-metadata';

// nativescript
import {nativeScriptBootstrap} from 'nativescript-angular/application';

// angular 
import {Component, provide} from 'angular2/core';

// app
import {
  TNSFontIconPipe,
  TNSFontIconService
} from 'nativescript-ng2-fonticon/nativescript-ng2-fonticon';

@Component({
  selector: 'app',
  template: `
  <ActionBar title="Fonticon Demo"> 
  </ActionBar>
  <StackLayout>
    <Label class="fa" [text]="'fa-bluetooth' | fonticon:'fa'"></Label>
  </StackLayout>
  `,
  pipes: [TNSFontIconPipe]
})
class DemoComponent {
  constructor(private pluginService: TNSFontIconService) {}
}

nativeScriptBootstrap(DemoComponent, [
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'fa': 'font-awesome.css'
      });
    }
  })
]);
