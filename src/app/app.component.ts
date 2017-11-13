// angular 
import { Component, AfterViewInit, NgModule } from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

// app
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
  selector: 'app',
  template: `
  <ActionBar title="Fonticon Demo"> 
    <ActionItem (tap)="toggleFirst()" ios.position="right">
      <Button text="Toggle"></Button>
    </ActionItem> 
  </ActionBar>
  <TabView>
    <ScrollView *tabItem="{title: 'FontAwesome'}">
      <GridLayout rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="*,*">
        <Label row="0" col="0" class="fa" [text]="(firstIcon$ | async) | fonticonPure"></Label>
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
        <Label row="0" col="0" class="ion" [text]="(firstIonIcon$ | async) | fonticonPure"></Label>
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
  `
})
export class AppComponent {
  public firstIcon$: BehaviorSubject<string> = new BehaviorSubject('');
  public firstIonIcon$: BehaviorSubject<string> = new BehaviorSubject('');
  public isToggled: boolean = false;
  constructor(private pluginService: TNSFontIconService) { 
    setTimeout(() => {
      this.firstIcon$.next('fa-glass');
      this.firstIonIcon$.next('ion-close');
    });
  }
  public toggleFirst() {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      this.firstIcon$.next('fa-stop');
      this.firstIonIcon$.next('ion-videocamera');
    } else {
      this.firstIcon$.next('fa-glass');
      this.firstIonIcon$.next('ion-close');
    }
  }
}
