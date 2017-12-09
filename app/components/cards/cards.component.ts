import {Component, OnInit} from '@angular/core';
import {CardsProvider} from "../../providers/cards/cards.provider";
import {CardModel} from "../../models/card.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";

@Component({
    selector: 'cards',
    templateUrl: './cards.component.html'
})
export class CardsComponent extends BaseComponent implements OnInit {
    public cards: CardModel[];
    public searchValue: string = "";

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
            return this.cards;
        }
        return this.cards.filter(x => x.customCardName.toUpperCase()
            .indexOf(this.searchValue.toUpperCase()) != -1);
    }
}