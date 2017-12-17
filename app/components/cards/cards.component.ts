import {Component, OnInit} from '@angular/core';
import {CardsProvider} from "../../providers/cards/cards.provider";
import {CardModel} from "../../models/card.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";

declare let $: any;

@Component({
    selector: 'cards',
    templateUrl: './cards.component.html'
})
export class CardsComponent extends BaseComponent implements OnInit {
    public cards: CardModel[];
    public searchValue: string = "";

    private selectedCardType = -1;

    constructor(settings: SettingsProvider,
                translations: TranslationsProvider,
                private cardProvider: CardsProvider,
                private preLoader: PreLoaderProvider) {
        super(translations, settings);
    }

    async ngOnInit() {
        this.preLoader.start();
        this.cards = await this.cardProvider.getCards();
        this.preLoader.stop();
    }

    getFilteredCards(): CardModel[] {
        if (!this.searchValue) {
            return this.filterByCardType(this.cards);
        }
        return this.filterByCardType(this.cards.filter(x => x.customCardName.toUpperCase()
            .indexOf(this.searchValue.toUpperCase()) != -1));
    }

    updateCardTypeFilter(type: number) {
        this.selectedCardType = type;
    }

    public async deleteCardFromList(result: boolean) {
        if (result) {
            this.cards = await this.cardProvider.getCards();
        }
    }

    private filterByCardType(cards: CardModel[]): CardModel[] {
        if (this.selectedCardType == -1) {
            return cards;
        }
        return cards.filter(x => x.cardType == this.selectedCardType);
    }
}