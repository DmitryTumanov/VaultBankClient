import {Component, EventEmitter, OnInit} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "../../models/task.model";
import {CardModel} from "../../models/card.model";
import {CardsProvider} from "../../providers/cards/cards.provider";
import {TransactionsProvider} from "../../providers/transactions/transactions.provider";
import {TransactionModel} from "../../models/transaction.model";
import {MaterializeAction} from "angular2-materialize";

@Component({
    selector: "task-settings",
    templateUrl: "./task-settings.component.html"
})
export class TaskSettingsComponent extends BaseComponent implements OnInit {
    public task: TaskModel = new TaskModel();
    public taskType: any;
    public isOnCardChange: boolean;
    public transactions: TransactionModel[] = [];
    public modalAction = new EventEmitter<string | MaterializeAction>();

    private card: CardModel = new CardModel();
    private cards: CardModel[] = [];
    private taskId: number = -1;
    private cardId: number = -1;

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                route: ActivatedRoute,
                private tasksProvider: TasksProvider,
                private cardsProvider: CardsProvider,
                private transactionsProvider: TransactionsProvider) {
        super(translator, settings);
        route.params.subscribe(params => {
            this.taskId = params['taskId'];
        });
    }

    async ngOnInit() {
        let tasks = await this.tasksProvider.getTasks();
        let cards = await this.cardsProvider.getCards();
        this.task = tasks.filter(x => x.goalId == this.taskId)[0];
        this.card = cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.cards = cards;
        this.taskType = this.settings.taskTypes.filter((x: any) => x.typeKey == this.task.targetType)[0];
        this.transactions = await this.getTaskTransactions();
    }

    public getTaskPercents(): number {
        if (!this.task.moneyCurrent) {
            return 0;
        }
        return +(this.task.moneyCurrent * 100 / this.task.moneyTarget).toFixed(1);
    }

    public getTaskImage(): string {
        if (!this.task.creditCardId || !this.card || !this.task) {
            return this.settings.defaultImage;
        }
        let cardType = this.settings.cardTypes.filter((y: any) => y.typeKey == this.card.cardType)[0];
        return cardType.image;
    }

    public getTaskProgressClass(): string {
        let percents = this.getTaskPercents();
        if (percents > 66) {
            return "green";
        }
        if (percents > 33) {
            return "yellow";
        }
        return "red";
    }

    public changeCard() {
        this.isOnCardChange = true;
        this.cardId = this.task.creditCardId;
    }

    public saveNewCard() {
        this.isOnCardChange = false;
        this.task.creditCardId = this.cardId;
        this.card = this.cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.cardId = -1;
        this.tasksProvider.editTask(this.task);
    }

    public async getTaskTransactions() {
        let items = await this.transactionsProvider.getTransactionsForTask(this.taskId);
        return items.map(x => TransactionModel.Convert(x, this.cards));
    }

    public cancelCardChange() {
        this.isOnCardChange = false;
        this.card = this.cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.cardId = -1;
    }

    public updateTaskCard(cardId: number) {
        this.cardId = cardId;
        this.card = this.cards.filter(x => x.creditCardId == this.cardId)[0];
    }

    public removeTask() {
        this.modalAction.emit({action: "modal", params: ['open']});
    }
}