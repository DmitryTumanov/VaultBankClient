import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TaskTypeModel} from "../../models/task-type.model";

declare let $: any;

@Component({
    selector: 'task-types',
    templateUrl: './task-types.component.html'
})
export class TaskTypesComponent extends BaseComponent {
    @Input()
    endDate: Date;
    @Input()
    moneyTarget: number;
    @Output()
    taskTypeChange = new EventEmitter();
    public taskType = -1;
    public taskTypes: TaskTypeModel[];

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider) {
        super(translator, settings);
        this.taskTypes = settings.taskTypes;
    }

    public updateTaskType(type: number) {
        this.taskType = type;
        this.taskTypeChange.emit(type);
    }

    public isTaskTypeActive(type: number): boolean {
        return type == this.taskType;
    }

    public monthDiff(d1: Date, d2: Date): number {
        let months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    public getCurrentTime(): Date {
        return new Date();
    }

    public getOverallMoney(taskType: TaskTypeModel): number {
        let percents = taskType.yearPercents * this.monthDiff(new Date(), this.endDate) / 12;
        return this.moneyTarget + this.moneyTarget * percents / 100;
    }
}