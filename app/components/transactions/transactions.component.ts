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
        let items = await this.transactionsProvider.getTransactionsForCard(1);
        this.transactions = items.map(x => this.convertToTransaction(x));
        console.log(this.transactions);
        this.preLoader.stop();
    }

    public updateTaskFilter(taskId: number) {
        this.taskId = taskId;
    }

    public updateCardFilter(cardId: number) {
        this.cardId = cardId;
    }

    public getFilteredTransactions(): TransactionModel[]{
        return this.filterByTask(this.transactions);
    }

    private filterByTask(list: TransactionModel[]):TransactionModel[]{
        if(this.taskId == -1){
            return this.filterByCard(list);
        }
        return this.filterByCard(list.filter(x=>x.task.goalId == this.taskId));
    }

    private filterByCard(list: TransactionModel[]):TransactionModel[]{
        if(this.cardId == -1){
            return list;
        }
        return list.filter(x=>x.creditCard.creditCardId == this.cardId);
    }

    private convertToTransaction(item: any): TransactionModel {
        let result = new TransactionModel();
        result.id = item.transactionId;
        result.isPausedOrError = item.isPausedOrError;
        result.transactionDateTime = new Date();
        result.money = item.money;
        result.transactionIsRetried = item.isTransactionRetried;
        result.status = item.status;
        result.creditCard = this.cards.filter(x => x.creditCardId == item.cardId)[0] || new CardModel();
        result.task = this.tasks.filter(x => x.goalId == item.goalId)[0] || new TaskModel();
        return result;
    }
}