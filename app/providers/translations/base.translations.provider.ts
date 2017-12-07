import {Injectable} from "@angular/core";
import {TranslationsService} from "../../services/translations/translations.service";
import {isNullOrUndefined} from "util";
import {StorageService} from "../../services/storage/storage.service";
import {SettingsProvider} from "../settings/settings.provider";

@Injectable()
export class BaseTranslationsProvider {
    private translations: any;

    constructor(private storageService: StorageService,
                private translationsService: TranslationsService,
                private settings: SettingsProvider) {
    }

    protected get(key: string): string {
        if (this.storageService.get(this.settings.languageKey) == "") {
            this.storageService.set(this.settings.languageKey, this.settings.defaultLanguage);
        }
        if (isNullOrUndefined(this.translations)) {
            this.translations = this.translationsService.getTranslations();
        }
        return this.translations[key][this.storageService.get(this.settings.languageKey)];
    }
}