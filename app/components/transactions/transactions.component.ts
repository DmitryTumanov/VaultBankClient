import {Component, OnInit} from '@angular/core';
import {CardsProvider} from "../../providers/cards/cards.provider";
import {CardModel} from "../../models/card.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {TaskModel} from "../../models/task.model";
import {TransactionModel} from "../../models/transaction.model";
import {TransactionsProvider} from "../../providers/transactions/transactions.provider";

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html'
})
export class TransactionsComponent extends BaseComponent implements OnInit {
    public cards: CardModel[];
    public tasks: TaskModel[];
    public transactions: TransactionModel[];

    constructor(settings: SettingsProvider,
                translations: TranslationsProvider,
                private cardProvider: CardsProvider,
                private tasksProvider: TasksProvider,
                private transactionsProvider: TransactionsProvider,
                private preLoader: PreLoaderProvider) {
        super(translations, settings);
    }

    async ngOnInit() {
        this.preLoader.start();
        this.cards = await this.cardProvider.getCards();
        this.tasks = await this.tasksProvider.getTasks();
        let test = await this.transactionsProvider.getTransactionsForCard(1);
        this.preLoader.stop();
    }

}