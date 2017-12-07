import {Component, Input} from '@angular/core';
import {TaskModel} from "../../models/task.model";
import {BaseComponent} from "../base/base.component";
import {CardModel} from "../../models/card.model";

@Component({
    selector: 'task-item',
    templateUrl: './task-item.component.html'
})
export class TaskItemComponent extends BaseComponent {
    @Input()
    public task: TaskModel;
    @Input()
    public card: CardModel;

    public isFull:boolean;

    get taskType():any{
        return this.settings.taskTypes.filter((x:any)=>x.typeKey == this.task.targetType)[0];
    }

    public getTaskImage(): string {
        if (!this.task.creditCardId || !this.card || !this.task) {
            return this.settings.defaultImage;
        }
        let cardType = this.settings.cardTypes.filter((y: any) => y.typeKey == this.card.cardType)[0];
        return cardType.image;
    }

    public getTaskPercents(): number {
        if(!this.task.moneyCurrent){
            return 0;
        }
        return +(this.task.moneyCurrent * 100 / this.task.moneyTarget).toFixed(2);
    }

    public triggerHeight(){
        this.isFull = !this.isFull;
    }
}