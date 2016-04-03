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
  <TabView>
    <ScrollView *tabItem="{title: 'FontAwesome'}">
      <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="*,*">
        <Label row="0" col="0" class="fa" [text]="'fa-glass' | fonticon"></Label>
        <Label row="0" col="1" class="fa" [text]="'fa-music' | fonticon"></Label>
        <Label row="1" col="0" class="fa" [text]="'fa-search' | fonticon"></Label>
        <Label row="1" col="1" class="fa" [text]="'fa-heart' | fonticon"></Label>
        <Label row="2" col="0" class="fa" [text]="'fa-star' | fonticon"></Label>
        <Label row="2" col="1" class="fa" [text]="'fa-user' | fonticon"></Label>
        <Label row="3" col="0" class="fa" [text]="'fa-film' | fonticon"></Label>
        <Label row="3" col="1" class="fa" [text]="'fa-check' | fonticon"></Label>
        <Label row="4" col="0" class="fa" [text]="'fa-power-off' | fonticon"></Label>
        <Label row="4" col="1" class="fa" [text]="'fa-signal' | fonticon"></Label>
        <Label row="5" col="0" class="fa" [text]="'fa-gear' | fonticon"></Label>
        <Label row="5" col="1" class="fa" [text]="'fa-bluetooth' | fonticon"></Label>
        <Label row="6" col="0" class="fa" [text]="'fa-refresh' | fonticon"></Label>
        <Label row="6" col="1" class="fa" [text]="'fa-lock' | fonticon"></Label>
        <Label row="7" col="0" class="fa" [text]="'fa-flag' | fonticon"></Label>
        <Label row="7" col="1" class="fa" [text]="'fa-headphones' | fonticon"></Label>
      </GridLayout>
    </ScrollView>

    <ScrollView *tabItem="{title: 'Ionicons'}">
      <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="*,*">
        <Label row="0" col="0" class="ion" [text]="'ion-close' | fonticon"></Label>
        <Label row="0" col="1" class="ion" [text]="'ion-code' | fonticon"></Label>
        <Label row="1" col="0" class="ion" [text]="'ion-crop' | fonticon"></Label>
        <Label row="1" col="1" class="ion" [text]="'ion-document' | fonticon"></Label>
        <Label row="2" col="0" class="ion" [text]="'ion-earth' | fonticon"></Label>
        <Label row="2" col="1" class="ion" [text]="'ion-edit' | fonticon"></Label>
        <Label row="3" col="0" class="ion" [text]="'ion-flag' | fonticon"></Label>
        <Label row="3" col="1" class="ion" [text]="'ion-fork' | fonticon"></Label>
        <Label row="4" col="0" class="ion" [text]="'ion-grid' | fonticon"></Label>
        <Label row="4" col="1" class="ion" [text]="'ion-hammer' | fonticon"></Label>
        <Label row="5" col="0" class="ion" [text]="'ion-headphone' | fonticon"></Label>
        <Label row="5" col="1" class="ion" [text]="'ion-heart' | fonticon"></Label>
        <Label row="6" col="0" class="ion" [text]="'ion-home' | fonticon"></Label>
        <Label row="6" col="1" class="ion" [text]="'ion-images' | fonticon"></Label>
        <Label row="7" col="0" class="ion" [text]="'ion-paintbrush' | fonticon"></Label>
        <Label row="7" col="1" class="ion" [text]="'ion-person' | fonticon"></Label>
      </GridLayout>
    </ScrollView>
  </TabView>  
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
        'fa': 'font-awesome.css',
        'ion': 'ionicons.css'
      }, true);
    }
  })
]);
