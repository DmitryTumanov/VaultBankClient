import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CardModel} from "../../models/card.model";
import {BaseComponent} from "../base/base.component";
import {CardTypeModel} from "../../models/card-type.model";
import {MaterializeAction} from "angular2-materialize";

@Component({
    selector: "card-item",
    templateUrl: './card-item.component.html'
})
export class CardItemComponent extends BaseComponent {
    @Input()
    public card: CardModel;
    @Output()
    public modalAction = new EventEmitter<string | MaterializeAction>();
    @Output()
    public cardOnDelete = new EventEmitter();

    public getCardImage(cardType: string): string {
        let cardSetting = this.settings.cardTypes.filter((x: CardTypeModel) => x.typeKey == cardType)[0];
        return cardSetting.image;
    }

    public removeCard() {
        this.modalAction.emit({action: "modal", params: ['open']});
    }

    public deleteCardFromList(result: boolean) {
        this.cardOnDelete.emit(result);
    }
}