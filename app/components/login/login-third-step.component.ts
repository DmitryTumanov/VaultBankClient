import {Component} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {AuthorizationProvider} from "../../providers/authorization/authorization.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginThirdStepModel} from "../../models/login-third-step.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

@Component({
    selector: "login-third-step",
    templateUrl: "./login-third-step.component.html"
})
export class LoginThirdStepComponent extends BaseComponent {
    public model: LoginThirdStepModel;
    public fatalError: string;

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                route: ActivatedRoute,
                private authorizationProvider: AuthorizationProvider,
                private router: Router,
                private preLoader: PreLoaderProvider) {
        super(translator, settings);
        this.model = new LoginThirdStepModel();
        route.params.subscribe(params => {
            this.model.twoWayAuthTarget = params['email'];
            this.model.login = params['login'];
        });
    }

    public login(){
        this.preLoader.start();
        this.authorizationProvider.authorizeThirdStep(this.model).then((result:boolean)=>{
            this.preLoader.stop();
            if(result){
                return this.router.navigateByUrl("/");
            }
            this.fatalError = "Invalid access key";
        });
    }
}