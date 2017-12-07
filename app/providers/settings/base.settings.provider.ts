import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
import {SettingsService} from "../../services/settings/settings.service";

@Injectable()
export class BaseSettingsProvider {
    private settings: any;

    constructor(private settingsService: SettingsService) {
    }

    protected get(key: string): any {
        if (isNullOrUndefined(this.settings)) {
            this.settings = this.settingsService.getSettings();
        }
        return this.settings[key];
    }
}