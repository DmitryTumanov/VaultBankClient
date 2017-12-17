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
    public transactions: TransactionModel[] = [];

    private taskId: number = -1;
    private cardId: number = -1;

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
        this.preLoader.stop();
    }

    async updateTaskFilter(taskId: number) {
        this.taskId = taskId;
        await this.updateTransactions();
    }

    async updateCardFilter(cardId: number) {
        this.cardId = cardId;
        await this.updateTransactions();
    }

    public getFilteredTransactions(): TransactionModel[] {
        return this.filterByTask(this.transactions);
    }

    private async updateTransactions() {
        this.preLoader.start();
        if (this.taskId == -1 && this.cardId == -1) {
            this.transactions = [];
        } else if (this.taskId == -1) {
            let items = await this.transactionsProvider.getTransactionsForCard(this.cardId);
            this.transactions = items.map(x => TransactionModel.Convert(x, this.cards, this.tasks));
        } else {
            let items = await this.transactionsProvider.getTransactionsForTask(this.taskId);
            this.transactions = items.map(x => TransactionModel.Convert(x, this.cards, this.tasks));
        }
        this.preLoader.stop();
    }

    private filterByTask(list: TransactionModel[]): TransactionModel[] {
        if (this.taskId == -1) {
            return this.filterByCard(list);
        }
        return this.filterByCard(list.filter(x => x.task.goalId == this.taskId));
    }

    private filterByCard(list: TransactionModel[]): TransactionModel[] {
        if (this.cardId == -1) {
            return list;
        }
        return list.filter(x => x.creditCard.creditCardId == this.cardId);
    }
}