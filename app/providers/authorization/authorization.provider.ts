import {Injectable} from "@angular/core";
import {LoginFirstStepModel} from "../../models/login-first-step.model";
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {LoginSecondStepModel} from "../../models/login-second-step.model";
import {LoginThirdStepModel} from "../../models/login-third-step.model";
import {LoginResponseModel} from "../../models/responces/login-response.model";
import {LoginSecondStepResponceModel} from "../../models/responces/login-second-step-responce.model";

@Injectable()
export class AuthorizationProvider {

    async authorizeFirstStep(loginModel: LoginFirstStepModel): Promise<LoginResponseModel>{
        return await this.authorizationService.loginFirstStep(loginModel);
    }

    async authorizeSecondStep(loginModel: LoginSecondStepModel): Promise<LoginSecondStepResponceModel>{
        return await this.authorizationService.loginSecondStep(loginModel);
    }

    async authorizeThirdStep(loginModel: LoginThirdStepModel): Promise<boolean>{
        return await this.authorizationService.loginThirdStep(loginModel);
    }

    async authorizeKeyStep(loginModel: LoginThirdStepModel): Promise<LoginResponseModel>{
        return await this.authorizationService.loginKeyStep(loginModel);
    }

    constructor(private authorizationService: AuthorizationService) {
    }
}