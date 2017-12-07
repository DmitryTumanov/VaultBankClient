import {Component} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {LoginFirstStepModel} from "../../models/login-first-step.model";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {AuthorizationProvider} from "../../providers/authorization/authorization.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginSecondStepModel} from "../../models/login-second-step.model";
import {LoginSecondStepResponceModel} from "../../models/responces/login-second-step-responce.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

@Component({
    selector: "login-second-step",
    templateUrl: "./login-second-step.component.html"
})
export class LoginSecondStepComponent extends BaseComponent {
    public model: LoginSecondStepModel;
    public fatalError: string;

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                private authorizationProvider: AuthorizationProvider,
                private router: Router,
                route: ActivatedRoute,
                private preLoader: PreLoaderProvider) {
        super(translator, settings);
        this.model = new LoginSecondStepModel();
        route.params.subscribe(params => {
            this.model.login = params['login'];
        });
    }

    public login() {
        this.preLoader.start();
        this.authorizationProvider.authorizeSecondStep(this.model)
            .then((result: LoginSecondStepResponceModel) => {
                this.preLoader.stop();
                if (result.isCompleted) {
                    return this.router.navigate(["/login-third-step", this.model.login, this.model.twoWayAuthTarget]);
                }
                if (result.isEmailExist) {
                    this.fatalError = "Email exists";
                }
                if (result.userNameNotFound) {
                    this.fatalError = "There is no user with this login";
                }
            });
    }
}