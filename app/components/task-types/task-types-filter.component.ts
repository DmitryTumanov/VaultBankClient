import {Component, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TaskTypeModel} from "../../models/task-type.model";
declare let $: any;

@Component({
    selector: 'task-types-filter',
    templateUrl: './task-types-filter.component.html'
})
export class TaskTypesFilterComponent extends BaseComponent{
    @Output()
    taskTypeChange = new EventEmitter();
    public taskType = -1;
    public taskTypes: TaskTypeModel[];

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider){
        super(translator, settings);
        this.taskTypes = settings.taskTypes;
    }

    public updateTaskType(type: number){
        if(this.taskType == type){
            type = -1;
        }
        this.taskType = type;
        this.taskTypeChange.emit(type);
    }

    public isTaskTypeActive(type: number):boolean{
        return type == this.taskType;
    }
}