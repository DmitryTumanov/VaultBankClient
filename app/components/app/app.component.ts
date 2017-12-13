import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    public mainWindowClass: string = "";

    private isDataPreLoading: boolean;

    constructor(private storage: StorageService,
                private settings: SettingsProvider,
                private preLoader: PreLoaderProvider) {
        preLoader.emitter.subscribe((result: boolean) => {
            setTimeout(() => this.isDataPreLoading = result, 10);
        });
    }

    ngOnInit(){
        this.mainWindowClass = this.getMainWindowClass();
    }

    private getMainWindowClass(): string {
        let resultClass = "";
        if (this.isMenuFull()) {
            resultClass += "full ";
        }
        if (this.getMenuStatus() == "block") {
            resultClass += "block ";
        } else if (this.getMenuStatus() == "shrink") {
            resultClass += "shrink ";
        }
        if (this.isDataPreLoading) {
            resultClass += "loaded";
        }
        return resultClass;
    }

    private isMenuFull(): boolean {
        let tokenValue = this.storage.get(this.settings.tokenKey);
        return !tokenValue;
    }

    private getMenuStatus(): string {
        return this.storage.get(this.settings.menuStateKey);
    }
}