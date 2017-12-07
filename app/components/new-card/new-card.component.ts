import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {ValidatorsProvider} from "../../providers/validators/validators.provider";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {CardsProvider} from "../../providers/cards/cards.provider";
import {Router} from "@angular/router";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

declare let $: any;

@Component({
    selector: 'new-card',
    templateUrl: './new-card.component.html'
})
export class NewCardComponent extends BaseComponent implements OnInit {
    public validator: any;
    public fatalError = "";

    constructor(validatorProvider: ValidatorsProvider,
                translator: TranslationsProvider,
                settings: SettingsProvider,
                private cardsProvider: CardsProvider,
                private router: Router,
                private preLoader: PreLoaderProvider) {
        super(translator, settings);
        this.validator = validatorProvider.creditCardValidator;
    }

    ngOnInit() {
        //
    }

    public updateCardType(type: number) {
        this.validator.controls.cardType.setValue(type);
    }

    public addNewCard() {
        let cardModel = this.validator.value;
        cardModel.expirationDate = this.getValidExpirationDate(this.validator.value.expirationDate);
        this.preLoader.start();
        this.cardsProvider.addCard(cardModel).then((result: boolean) => {
            this.preLoader.stop();
            if (result) {
                return this.router.navigateByUrl("/cards");
            }
            this.fatalError = "Fatal Error";
        });
    }

    private getValidExpirationDate(expirationDate: string): string {
        let values = expirationDate.split('/');
        return "01/" + values[0] + "/" + values[1];
    }

    public getControl(key: string): any {
        return this.validator.controls[key];
    }

    public validateControl(key: string): any {
        return !this.validator.controls[key].valid && this.validator.controls[key].touched;
    }
}