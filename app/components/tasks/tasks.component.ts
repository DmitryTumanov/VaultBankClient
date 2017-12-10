import {Component, OnInit} from '@angular/core';
import {TaskModel} from "../../models/task.model";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {BaseComponent} from "../base/base.component";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {CardsProvider} from "../../providers/cards/cards.provider";
import {CardModel} from "../../models/card.model";

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent extends BaseComponent implements OnInit {
    public tasks: TaskModel[] = [];
    public cards: CardModel[] = [];
    public searchValue: string = "";

    private selectedTaskType = -1;

    constructor(settings: SettingsProvider,
                translator: TranslationsProvider,
                private taskProvider: TasksProvider,
                private cardProvider: CardsProvider) {
        super(translator, settings);
    }

    async ngOnInit() {
        this.tasks = await this.taskProvider.getTasks();
        this.cards = await this.cardProvider.getCards();
    }

    public getCardForTask(creditCardId: number):CardModel{
        if(!(!!this.cards && this.cards.length > 0)){
            return null;
        }
        return this.cards.filter((x)=>x.creditCardId == creditCardId)[0];
    }

    getFilteredTasks(): TaskModel[] {
        if (!this.searchValue) {
            return this.filterByCardType(this.tasks);
        }
        return this.filterByCardType(this.tasks.filter(x => x.title.toUpperCase()
            .indexOf(this.searchValue.toUpperCase()) != -1));
    }

    updateTaskTypeFilter(type: number) {
        this.selectedTaskType = type;
    }

    private filterByCardType(tasks: TaskModel[]): TaskModel[] {
        if (this.selectedTaskType == -1) {
            return tasks;
        }
        return tasks.filter(x => x.targetType == this.selectedTaskType);
    }
}