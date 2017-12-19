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

    private targetEndValue: any = null;
    private moneyPerMonthValue: any = null;
    private moneyTargetValue: any = null;
    private targetEndChange: boolean = true;
    private moneyPerMonthChange: boolean = true;
    private moneyTargetChange: boolean = false;

    set val(val: any) {
        this.validator = val;
        this.validatorChange.emit(this.validator);
        this.validator.valueChanges.subscribe((data: any) => this.updateFormControls(data));
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

    private updateFormControls(data: any) {
        if (!data.targetEnd && !data.moneyPerMonth && !data.moneyTarget) {
            return;
        }
        if (data.targetEnd && data.moneyPerMonth) {
            if (!(this.targetEndValue == data.targetEnd && this.moneyPerMonthValue == data.moneyPerMonth)) {
                this.updateOnDateAndMonthValue(data);
                return;
            }
        }
        if (data.moneyPerMonth && data.moneyTarget) {
            if (!(this.moneyPerMonthValue == data.moneyPerMonth && this.moneyTargetValue == data.moneyTarget)) {
                this.updateOnMonthAndTotalValue(data);
                return;
            }
        }
        if(data.targetEnd && data.moneyTarget){
            if (!(this.targetEndValue == data.targetEnd && this.moneyTargetValue == data.moneyTarget)) {
                this.updateOnDateAndTotalValue(data);
                return;
            }
        }
    }

    private updateOnMonthAndTotalValue(data:any){
        let division = data.moneyTarget / data.moneyPerMonth;
        let months = Math.floor(division);
        let days = 30 * (division - Math.floor(division));
        let actualDate = new Date();
        let monthsNumber = this.settings.taskTypes[0].monthsNumber;
        months = months < monthsNumber ? monthsNumber : months;
        actualDate.setMonth(actualDate.getMonth() + months);
        actualDate.setDate(actualDate.getDate() + days);
        this.moneyPerMonthValue = data.moneyPerMonth;
        this.moneyTargetValue = data.moneyTarget;
        this.targetEndValue = actualDate.getDate() + "/" + +(actualDate.getMonth() + 1) + "/" + actualDate.getFullYear();
        this.validator.controls.targetEnd.setValue(this.targetEndValue);
    }

    private updateOnDateAndMonthValue(data:any){
        let dateSplited = data.targetEnd.split("/");
        let targetDate = new Date(+dateSplited[2], +dateSplited[1] - 1, +dateSplited[0]);
        let actualDate = new Date();
        let months = (targetDate.getFullYear() - actualDate.getFullYear()) * 12;
        months += targetDate.getMonth() - actualDate.getMonth();
        this.targetEndValue = data.targetEnd;
        this.moneyPerMonthValue = data.moneyPerMonth;
        this.moneyTargetValue = months * data.moneyPerMonth;
        this.validator.controls.moneyTarget.setValue(this.moneyTargetValue);
    }

    private updateOnDateAndTotalValue(data:any){
        let dateSplited = data.targetEnd.split("/");
        let targetDate = new Date(+dateSplited[2], +dateSplited[1] - 1, +dateSplited[0]);
        let actualDate = new Date();
        let months = (targetDate.getFullYear() - actualDate.getFullYear()) * 12;
        months += targetDate.getMonth() - actualDate.getMonth();
        this.targetEndValue = data.targetEnd;
        this.moneyTargetValue = data.moneyTarget;
        this.moneyPerMonthValue = data.moneyTarget / months;
        this.validator.controls.moneyPerMonth.setValue(this.moneyPerMonthValue);
    }
}