import {Component} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {AuthorizationProvider} from "../../providers/authorization/authorization.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginSecondStepModel} from "../../models/login-second-step.model";
import {LoginSecondStepResponceModel} from "../../models/responces/login-second-step-responce.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {ValidatorsProvider} from "../../providers/validators/validators.provider";

@Component({
    selector: "login-second-step",
    templateUrl: "./login-second-step.component.html"
})
export class LoginSecondStepComponent extends BaseComponent {
    public model: LoginSecondStepModel;
    public fatalError: string;
    public validator: any;

    constructor(validatorProvider: ValidatorsProvider,
                translator: TranslationsProvider,
                settings: SettingsProvider,
                private authorizationProvider: AuthorizationProvider,
                private router: Router,
                route: ActivatedRoute,
                private preLoader: PreLoaderProvider) {
        super(translator, settings);
        this.model = new LoginSecondStepModel();
        this.validator = validatorProvider.secondAuthFormValidator;
        route.params.subscribe(params => {
            this.model.login = params['login'];
        });
    }

    public login() {
        this.preLoader.start();
        this.model = this.getResultModel();
        this.authorizationProvider.authorizeSecondStep(this.model)
            .then((result: LoginSecondStepResponceModel) => {
                this.preLoader.stop();
                if (result.isCompleted) {
                    return this.router.navigate(["/login-third-step", this.model.login, this.model.twoWayAuthTarget]);
                }
                if (result.isEmailOrPhoneExists) {
                    this.fatalError = "Email exists";
                }
                if (result.userNameNotFound) {
                    this.fatalError = "There is no user with this login";
                }
            });
    }

    public getControl(key: string): any {
        return this.validator.controls[key];
    }

    public validateControl(key: string): any {
        return !this.validator.controls[key].valid && this.validator.controls[key].touched;
    }

    public isFormValid(): boolean {
        let isControlsValid = this.validator.controls.password.valid &&
            this.validator.controls.passwordCheck.valid &&
            this.validator.controls.authModelType.valid;
        if(this.validator.controls.authModelType.value == 0){
            isControlsValid = isControlsValid && this.validator.controls.email.valid;
        }
        else if(this.validator.controls.authModelType.value == 1){
            isControlsValid = isControlsValid && this.validator.controls.telephone.valid;
        }
        else {
            return false;
        }
        return isControlsValid;
    }

    public changeAuthType(type: number) {
        this.validator.controls.authModelType.setValue(type);
    }

    private getResultModel(): LoginSecondStepModel {
        let result = new LoginSecondStepModel();
        result.login = this.model.login;
        result.password = this.validator.controls.password.value;
        result.passwordCheck = this.validator.controls.passwordCheck.value;
        result.authModelType = this.validator.controls.authModelType.value;
        if (result.authModelType == 0) {
            result.twoWayAuthTarget = this.validator.controls.email.value;
        } else {
            result.twoWayAuthTarget = this.validator.controls.telephone.value;
        }
        return result;
    }
}