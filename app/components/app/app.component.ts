import {Component} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public isDataPreLoading: boolean;

    constructor(private storage: StorageService,
                private settings: SettingsProvider,
                private preLoader: PreLoaderProvider) {
        preLoader.emitter.subscribe((result: boolean) => {
            setTimeout(() => this.isDataPreLoading = result, 10);
        });
    }

    isMenuFull(): boolean {
        let tokenValue = this.storage.get(this.settings.tokenKey);
        return !tokenValue;
    }

    getMenuStatus(): string {
        return this.storage.get(this.settings.menuStateKey);
    }
}