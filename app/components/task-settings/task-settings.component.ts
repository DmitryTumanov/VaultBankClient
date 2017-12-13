import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "../../models/task.model";
import {CardModel} from "../../models/card.model";
import {CardsProvider} from "../../providers/cards/cards.provider";

@Component({
    selector: "task-settings",
    templateUrl: "./task-settings.component.html"
})
export class TaskSettingsComponent extends BaseComponent implements OnInit {
    public task: TaskModel = new TaskModel();
    public taskType: any;
    public isOnCardChange: boolean;

    private card: CardModel = new CardModel();
    private cards: CardModel[] = [];
    private taskId: number = -1;
    private cardId: number = -1;

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                route: ActivatedRoute,
                private tasksProvider: TasksProvider,
                private cardsProvider: CardsProvider) {
        super(translator, settings);
        route.params.subscribe(params => {
            this.taskId = params['taskId'];
        });
    }

    async ngOnInit() {
        let tasks = await this.tasksProvider.getTasks();
        this.cards = await this.cardsProvider.getCards();
        this.task = tasks.filter(x => x.goalId == this.taskId)[0];
        this.card = this.cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.taskType = this.settings.taskTypes.filter((x: any) => x.typeKey == this.task.targetType)[0];
    }

    public getTaskPercents(): number {
        if (!this.task.moneyCurrent) {
            return 0;
        }
        return +(this.task.moneyCurrent * 100 / this.task.moneyTarget).toFixed(2);
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

    public changeCard(){
        this.isOnCardChange = true;
        this.cardId = this.task.creditCardId;
    }

    public async saveNewCard(){
        this.isOnCardChange = false;
        this.task.creditCardId = this.cardId;
        this.card = this.cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.cardId = -1;
        await this.tasksProvider.editTask(this.task);
    }

    public cancelCardChange(){
        this.isOnCardChange = false;
        this.card = this.cards.filter(x => x.creditCardId == this.task.creditCardId)[0];
        this.cardId = -1;
    }

    public updateTaskCard(cardId: number) {
        this.cardId = cardId;
        this.card = this.cards.filter(x => x.creditCardId == this.cardId)[0];
    }
}