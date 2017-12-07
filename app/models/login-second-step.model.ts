import {LoginFirstStepModel} from "./login-first-step.model";

export class LoginSecondStepModel extends LoginFirstStepModel{
    public passwordCheck: string;
    public twoWayAuthTarget: string;
    public authModelType: number = 0;

}