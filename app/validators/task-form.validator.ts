import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class TaskFormValidator {
    private fb: FormBuilder;

    constructor(fb: FormBuilder) {
        this.fb = fb;
    }

    public getFirstStepValidator() {
        return this.fb.group({
            'title': [null, Validators.required],
            'description': null,
            'creditCardId': null,
            'targetEnd': [null, Validators.required],
            'moneyPerMonth': [null, Validators.required],
            'moneyTarget': [null, Validators.required]
        });
    }

    public getSecondStepValidator() {
        return this.fb.group({
            'targetType': [null, Validators.required]
        });
    }

    public getThirdStepValidator() {
        return this.fb.group({
            'chargeDate': [1, Validators.required]
        });
    }
}