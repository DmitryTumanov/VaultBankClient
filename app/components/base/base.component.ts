import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {Component} from "@angular/core";

@Component({
    selector: 'base',
    template: ''
})
export class BaseComponent{
    public translator: TranslationsProvider;
    public settings: SettingsProvider;

    constructor(translator: TranslationsProvider, settings: SettingsProvider){
        this.translator = translator;
        this.settings = settings;
    }
}