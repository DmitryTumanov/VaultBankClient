import { Injectable } from "@angular/core";
import {CardModel} from "../../models/card.model";
import {BaseService} from "../base/base.service";

@Injectable()
export class CardsService extends BaseService{

    public getCards(userName: string):Promise<CardModel[]>{
        return new Promise((resolve, reject) => {
            this.getAuthorized(this.settings.cardsPath)
                .subscribe((response: CardModel[]) => {
                    resolve(response);
                });
        });
    }

    public addCard(card: CardModel):Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.postAuthorized(this.settings.cardAddPath, card)
                .subscribe((response: boolean) => {
                    resolve(response);
                });
        });
    }

    public removeCard(card: CardModel):Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.postAuthorized(this.settings.cardRemovePath, card.creditCardId)
                .subscribe((response: boolean) => {
                    resolve(response);
                });
        });
    }
}