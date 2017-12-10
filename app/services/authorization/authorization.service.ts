import {Injectable} from "@angular/core";
import {LoginFirstStepModel} from "../../models/login-first-step.model";
import {LoginSecondStepModel} from "../../models/login-second-step.model";
import {LoginThirdStepModel} from "../../models/login-third-step.model";
import {LoginResponseModel} from "../../models/responces/login-response.model";
import {BaseService} from "../base/base.service";
import {LoginSecondStepResponceModel} from "../../models/responces/login-second-step-responce.model";

@Injectable()
export class AuthorizationService extends BaseService {

    public loginFirstStep(loginModel: LoginFirstStepModel): Promise<LoginResponseModel> {
        return new Promise((resolve, reject) => {
            this.post(this.settings.authorizationPath, loginModel)
                .subscribe((response: LoginResponseModel) => {
                    resolve(response);
                });
        });
    }

    public loginSecondStep(loginModel: LoginSecondStepModel): Promise<LoginSecondStepResponceModel> {
        return new Promise((resolve, reject) => {
            this.post(this.settings.authorizationSecondStep, this.mapSecondStepModel(loginModel))
                .subscribe((response: LoginSecondStepResponceModel) => {
                    resolve(response);
                });
        });
    }

    public loginThirdStep(loginModel: LoginThirdStepModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.post(this.settings.authorizationThirdStep, this.mapThirdStepModel(loginModel))
                .subscribe((response: boolean) => {
                    resolve(response);
                });
        });
    }

    public loginKeyStep(loginModel: LoginThirdStepModel): Promise<LoginResponseModel> {
        return new Promise((resolve, reject) => {
            this.post(this.settings.authorizationKeyStep, this.mapKeyStepModel(loginModel))
                .subscribe((response: LoginResponseModel) => {
                    resolve(response);
                });
        });
    }

    private mapSecondStepModel(loginModel: LoginSecondStepModel): any {
        return {
            "UserName": loginModel.login,
            "Password": loginModel.password,
            "SecondPassword": loginModel.passwordCheck,
            "TwoWayAuthTarget": loginModel.twoWayAuthTarget
        }
    }

    private mapThirdStepModel(loginModel: LoginThirdStepModel): any {
        return {
            "UserName": loginModel.login,
            "TwoWayAuthKey": loginModel.twoWayAuthKey
        }
    }

    private mapKeyStepModel(loginModel: LoginThirdStepModel): any {
        return {
            "AuthKey": loginModel.twoWayAuthKey
        }
    }
}