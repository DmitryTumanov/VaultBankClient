import {Component, EventEmitter, Input} from "@angular/core";
import {CardModel} from "../../models/card.model";
import {BaseComponent} from "../base/base.component";
import {MaterializeAction} from "angular2-materialize";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {CardsProvider} from "../../providers/cards/cards.provider";

@Component({
    selector: "card-remove-confirm",
    templateUrl: './card-remove-confirm.component.html'
})
export class CardRemoveConfirmComponent extends BaseComponent {
    @Input()
    public card: CardModel;
    @Input()
    public modalAction:EventEmitter<string|MaterializeAction>;

    public modalParams = [
        {
            dismissible: false,
            complete: function() { console.log('Closed'); }
        }
    ];

    constructor(settings:SettingsProvider,
                translator:TranslationsProvider,
                private preLoader: PreLoaderProvider,
                private cardsProvider: CardsProvider){
        super(translator, settings);
    }

    public closeModal() {
        this.modalAction.emit({action:"modal",params:['close']});
    }

    removeCard(){
        this.closeModal();
        this.preLoader.start();
        this.cardsProvider.removeCard(this.card);
        this.preLoader.stop();
    }
}