import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: "new-task-step-one",
    templateUrl: "./new-task-step-one.component.html"
})
export class NewTaskStepOneComponent extends BaseComponent implements OnInit {
    public validator: any;
    public fatalError = "";
    public pickerFormat: any;

    @Input()
    get val() {
        return this.validator;
    }

    @Output()
    public validatorChange = new EventEmitter();

    set val(val: any) {
        this.validator = val;
        this.validatorChange.emit(this.validator);
    }

    ngOnInit() {
        this.pickerFormat = [{
            format: 'dd/mm/yyyy',
            disable: this.getDisabledDates(),
            min: new Date()
        }];
    }

    public updateTaskCard(cardId: number) {
        this.validator.controls.creditCardId.setValue(cardId);
    }

    public getControl(key: string): any {
        return this.validator.controls[key];
    }

    public validateControl(key: string): any {
        return !this.validator.controls[key].valid && this.validator.controls[key].touched;
    }

    public getDisabledDates(): any {
        let dateArray = [];
        let monthsNumber = this.settings.taskTypes[0].monthsNumber;
        let now = new Date();
        let newDate = new Date(new Date().setMonth(new Date().getMonth() + monthsNumber));
        while (now <= newDate) {
            dateArray.push(new Date(now));
            now = new Date(now.setDate(now.getDate() + 1));
        }
        return dateArray;
    }
}