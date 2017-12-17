import {Injectable} from "@angular/core";
import {CardModel} from "../../models/card.model";
import {CardsService} from "../../services/cards/cards.service";
import {isNullOrUndefined} from "util";
import {SettingsProvider} from "../settings/settings.provider";
import {StorageService} from "../../services/storage/storage.service";
import {TasksProvider} from "../tasks/tasks.provider";

@Injectable()
export class CardsProvider {

    constructor(private cardsService: CardsService,
                private settings: SettingsProvider,
                private storage: StorageService) {
    }

    async getCards(): Promise<CardModel[]> {
        return await this.cardsService.getCards(this.storage.get(this.settings.userKey));
    }

    async addCard(newCard: CardModel): Promise<boolean> {
        return await this.cardsService.addCard(newCard);
    }

    async removeCard(card: CardModel) {
        return await this.cardsService.removeCard(card);
    }
}