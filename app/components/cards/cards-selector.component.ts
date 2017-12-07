import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {CardsProvider} from "../../providers/cards/cards.provider";
import {CardModel} from "../../models/card.model";
import {CardTypeModel} from "../../models/card-type.model";

declare let $: any;

@Component({
    selector: 'cards-selector',
    templateUrl: './cards-selector.component.html'
})
export class CardsSelectorComponent extends BaseComponent implements OnInit {
    @Output()
    cardChange = new EventEmitter();
    public cards: CardModel[];
    public selectedCard = "";

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                private cardsProvider: CardsProvider) {
        super(translator, settings);
    }

    async ngOnInit() {
        this.cards = await this.cardsProvider.getCards();
    }

    public updateCard(cardOption: any) {
        this.selectedCard = cardOption.target.value.trim();
        this.cardChange.emit(this.selectedCard);
    }

    public getCardImage(cardType: string): string {
        let cardSetting = this.settings.cardTypes.filter((x: CardTypeModel) => x.typeKey == cardType)[0];
        return cardSetting.smallImage;
    }
}