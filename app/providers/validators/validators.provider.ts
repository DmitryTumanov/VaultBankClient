import {CreditCardFormValidator} from "../../validators/credit-card-form.validator";
import {Injectable} from "@angular/core";
import {TaskFormValidator} from "../../validators/task-form.validator";

@Injectable()
export class ValidatorsProvider{

    constructor(private creditCardFormValidator: CreditCardFormValidator,
                private taskFormValidator: TaskFormValidator){}

    get creditCardValidator(){
        return this.creditCardFormValidator.getValidator();
    }

    get taskFirstStepValidator(){
        return this.taskFormValidator.getFirstStepValidator();
    }

    get taskSecondStepValidator(){
        return this.taskFormValidator.getSecondStepValidator();
    }

    get taskThirdStepValidator(){
        return this.taskFormValidator.getThirdStepValidator();
    }

}