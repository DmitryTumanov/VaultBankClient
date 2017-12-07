import {Component} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavComponent extends BaseComponent{
    constructor(private storage: StorageService,
                settings: SettingsProvider,
                translator: TranslationsProvider) {
        super(translator, settings);
    }

    public getNavbarState(): string {
        let tokenValue = this.storage.get(this.settings.tokenKey);
        if (!tokenValue) {
            return "hidden";
        }
        return this.storage.get(this.settings.menuStateKey);
    }

    public shrinkMenu() {
        let menuStates = ["block", "shrink"];
        let currentState = this.storage.get(this.settings.menuStateKey);
        if(!currentState){
            currentState = "block";
        }
        let index = menuStates.indexOf(currentState);
        menuStates.splice(index, 1);
        this.storage.set(this.settings.menuStateKey, menuStates[0]);
    }
}