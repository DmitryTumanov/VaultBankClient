import {Component} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {AuthorizationProvider} from "../../providers/authorization/authorization.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginThirdStepModel} from "../../models/login-third-step.model";
import {StorageService} from "../../services/storage/storage.service";
import {LoginResponseModel} from "../../models/responces/login-response.model";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";

@Component({
    selector: "login-key-step",
    templateUrl: "./login-key-step.component.html"
})
export class LoginKeyStepComponent extends BaseComponent {
    public model: LoginThirdStepModel;
    public fatalError: string;

    constructor(translator: TranslationsProvider,
                settings: SettingsProvider,
                route: ActivatedRoute,
                private preLoader: PreLoaderProvider,
                private authorizationProvider: AuthorizationProvider,
                private storage: StorageService,
                private router: Router) {
        super(translator, settings);
        this.model = new LoginThirdStepModel();
        route.params.subscribe(params => {
            this.model.login = params['login'];
        });
    }

    public login(){
        this.preLoader.start();
        this.authorizationProvider.authorizeKeyStep(this.model).then((result:LoginResponseModel)=>{
            this.preLoader.stop();
            if(result){
                this.storage.set(this.settings.tokenKey, result.token.access_token);
                this.storage.set(this.settings.userKey, result.token.username);
                return this.router.navigateByUrl("/cards");
            }
            this.fatalError = "Invalid access key";
        });
    }
}