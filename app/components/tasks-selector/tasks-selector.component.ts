import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {TaskModel} from "../../models/task.model";
import {TaskTypeModel} from "../../models/task-type.model";

declare let $: any;

@Component({
    selector: 'tasks-selector',
    templateUrl: './tasks-selector.component.html'
})
export class TasksSelectorComponent extends BaseComponent implements OnInit {
    @Output()
    taskChange = new EventEmitter();
    public tasks: TaskModel[];
    public selectedTask = "";

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                private tasksProvider: TasksProvider) {
        super(translator, settings);
    }

    async ngOnInit() {
        this.tasks = await this.tasksProvider.getTasks();
    }

    public updateTask(taskOption: any) {
        this.selectedTask = taskOption.target.value.trim();
        this.taskChange.emit(this.selectedTask);
    }

    public getTaskImage(taskType: string): string {
        let taskSetting = this.settings.taskTypes.filter((x: TaskTypeModel) => x.typeKey == taskType)[0];
        return taskSetting.smallImage;
    }
}