import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {CustomValidators} from "ng2-validation";

@Injectable()
export class AuthFormsValidator {
    private fb: FormBuilder;

    constructor(fb: FormBuilder) {
        this.fb = fb;
    }

    public getFirstFormValidator() {
        return this.fb.group({
            'login': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    public getSecondFormValidator() {
        return this.fb.group({
            'password': [null, Validators.required],
            'passwordCheck': [null, Validators.required],
            'authModelType': [0, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'telephone': [null, Validators.compose([Validators.required, CustomValidators.telephone])],
        });
    }

    public getThirdFormValidator() {
        return this.fb.group({
            'twoWayAuthKey': [null, Validators.required]
        });
    }

    public getKeyFormValidator() {
        return this.fb.group({
            'twoWayAuthKey': [null, Validators.required]
        });
    }
}