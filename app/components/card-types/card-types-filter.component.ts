import {Component, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {CardTypeModel} from "../../models/card-type.model";
declare let $: any;

@Component({
    selector: 'card-types-filter',
    templateUrl: './card-types-filter.component.html'
})
export class CardTypesFilterComponent extends BaseComponent{
    @Output()
    cardTypeChange = new EventEmitter();
    public cardType = -1;
    public cardTypes: CardTypeModel[];

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider){
        super(translator, settings);
        this.cardTypes = settings.cardTypes;
    }

    public updateCardType(type: number){
        if(this.cardType == type){
            type = -1;
        }
        this.cardType = type;
        this.cardTypeChange.emit(type);
    }

    public isCardTypeActive(type: number):boolean{
        return type == this.cardType;
    }
}