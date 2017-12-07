import {Injectable} from "@angular/core";
import {TranslationsService} from "../services/translations/translations.service";
import {SettingsService} from "../services/settings/settings.service";

@Injectable()
export class AppInitializer {

    constructor(private translationsService: TranslationsService, private settingsService:SettingsService){}

    public load() {
        return this.translationsService.getPromise().then(()=>{return this.settingsService.getPromise()});
    }
}