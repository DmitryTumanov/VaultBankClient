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
}