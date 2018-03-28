import { Component, OnInit } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent {
    public firstIcon$: BehaviorSubject<string> = new BehaviorSubject('');
    public firstIonIcon$: BehaviorSubject<string> = new BehaviorSubject('');
    public isToggled: boolean = false;
    constructor() {
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
