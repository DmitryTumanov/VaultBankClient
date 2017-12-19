import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseComponent} from "../base/base.component";

@Component({
    selector: "new-task-step-two",
    templateUrl: "./new-task-step-two.component.html"
})
export class NewTaskStepTwoComponent extends BaseComponent{
    public validator: any;
    public fatalError = "";

    @Input()
    public targetEnd: any;
    @Input()
    public moneyTarget: any;

    @Input()
    get val(){
        return this.validator;
    }

    @Output()
    public validatorChange = new EventEmitter();

    set val(val:any) {
        this.validator = val;
        this.validatorChange.emit(this.validator);
    }

    public getControl(key: string): any {
        return this.validator.controls[key];
    }

    public validateControl(key: string): any {
        return !this.validator.controls[key].valid && this.validator.controls[key].touched;
    }

    public updateTaskType(newType: number){
        this.validator.controls.targetType.setValue(newType);
    }

    public getTargetEndDate():Date{
        let result = this.targetEnd;
        if(!result){
            return new Date();
        }
        return new Date(this.convertDate(result));
    }

    private convertDate(targetEnd: string):string {
        let results = targetEnd.split("/");
        return results[1]+"/"+results[0]+"/"+results[2];
    }
}