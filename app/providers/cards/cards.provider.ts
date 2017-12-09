import {Injectable} from "@angular/core";
import {CardModel} from "../../models/card.model";
import {CardsService} from "../../services/cards/cards.service";
import {isNullOrUndefined} from "util";
import {SettingsProvider} from "../settings/settings.provider";
import {SettingsService} from "../../services/settings/settings.service";
import {StorageService} from "../../services/storage/storage.service";
import {TasksProvider} from "../tasks/tasks.provider";

@Injectable()
export class CardsProvider {
    private _cards: CardModel[];

    constructor(private cardsService: CardsService,
                private settings: SettingsProvider,
                private storage: StorageService,
                private tasksProvider: TasksProvider) {
    }

    async getCards(): Promise<CardModel[]> {
        if (isNullOrUndefined(this._cards)) {
            this._cards = await this.cardsService.getCards(this.storage.get(this.settings.userKey));
        }
        return this._cards;
    }

    async addCard(newCard: CardModel): Promise<boolean> {
        return await this.cardsService.addCard(newCard).then((result: boolean) => {
            if (result) {
                this._cards = null; //just for updating
            }
            return result;
        });
    }

    async removeCard(card: CardModel) {
        return await this.cardsService.removeCard(card).then(async (result: boolean) => {
            if (result) {
                let item = this._cards.filter(a=>a.customCardName == card.customCardName)[0];
                let index = this._cards.indexOf(item);
                this._cards.splice(index, 1);
                await this.tasksProvider.refresh();
            }
            return result;
        });
    }
}