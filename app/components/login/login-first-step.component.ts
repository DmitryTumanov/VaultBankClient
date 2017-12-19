import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {LoginFirstStepModel} from "../../models/login-first-step.model";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {AuthorizationProvider} from "../../providers/authorization/authorization.provider";
import {Router} from "@angular/router";
import {LoginResponseModel} from "../../models/responces/login-response.model";
import {isNullOrUndefined} from "util";
import {StorageService} from "../../services/storage/storage.service";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {ValidatorsProvider} from "../../providers/validators/validators.provider";

@Component({
    selector: "login-first-step",
    templateUrl: "./login-first-step.component.html"
})
export class LoginFirstStepComponent extends BaseComponent implements OnInit{
    public model: LoginFirstStepModel;
    public fatalError: string;
    public validator: any;

    constructor(validatorProvider: ValidatorsProvider,
                translator: TranslationsProvider,
                settings: SettingsProvider,
                private authorizationProvider: AuthorizationProvider,
                private router: Router,
                private storage: StorageService,
                private preLoader: PreLoaderProvider) {
        super(translator, settings);
        this.model = new LoginFirstStepModel();
        this.validator = validatorProvider.firstAuthFormValidator;
    }

    ngOnInit(){
        this.storage.set(this.settings.tokenKey, "");
        this.storage.set(this.settings.userKey, "");
        this.storage.set(this.settings.menuStateKey, "");
    }

    public login(){
        this.preLoader.start();
        this.model = this.validator.value;
        this.authorizationProvider.authorizeFirstStep(this.model).then((result:LoginResponseModel)=>{
            this.preLoader.stop();
            if(isNullOrUndefined(result) || result.isError){
                this.fatalError = "Неверные логин и пароль";
                return;
            }
            if(result.isRegistrationNotFinished){
                return this.router.navigate(["/login-second-step", this.model.login]);
            }
            if(result.isWaitTwoWayKey){
                return this.router.navigate(["/login-key-step", this.model.login]);
            }
            this.fatalError = "Неверные логин и пароль";
        });
    }

    public getControl(key: string): any {
        return this.validator.controls[key];
    }

    public validateControl(key: string): any {
        return !this.validator.controls[key].valid && this.validator.controls[key].touched;
    }
}