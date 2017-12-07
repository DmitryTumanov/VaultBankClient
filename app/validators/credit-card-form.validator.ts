import {FormBuilder, PatternValidator, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {Injectable} from "@angular/core";

@Injectable()
export class CreditCardFormValidator {
    private fb: FormBuilder;

    constructor(fb: FormBuilder) {
        this.fb = fb;
    }

    public getValidator() {
        return this.fb.group({
            'customCardName': [null, Validators.required],
            'ownerFullName': [null, Validators.required],
            'CVV': [null, Validators.required],
            'cardNumber': [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
            'expirationDate': [null, Validators.compose([Validators.required,
                                                         Validators.pattern("\\d{2}\/\\d{2}")])],
            'cardType': [null, Validators.required]
        });
    }
}