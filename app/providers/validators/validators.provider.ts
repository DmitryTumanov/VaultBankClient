import {CreditCardFormValidator} from "../../validators/credit-card-form.validator";
import {Injectable} from "@angular/core";
import {TaskFormValidator} from "../../validators/task-form.validator";
import {AuthFormsValidator} from "../../validators/auth-forms.validator";

@Injectable()
export class ValidatorsProvider{

    constructor(private creditCardFormValidator: CreditCardFormValidator,
                private taskFormValidator: TaskFormValidator,
                private authValidator: AuthFormsValidator){}

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

    get firstAuthFormValidator(){
        return this.authValidator.getFirstFormValidator();
    }

    get secondAuthFormValidator(){
        return this.authValidator.getSecondFormValidator();
    }

    get thirdAuthFormValidator(){
        return this.authValidator.getThirdFormValidator();
    }

    get keyAuthFormValidator(){
        return this.authValidator.getKeyFormValidator();
    }

}