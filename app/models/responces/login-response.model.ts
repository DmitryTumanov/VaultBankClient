import {TokenModel} from "../token.model";

export class LoginResponseModel{
    public isError: boolean;
    public token: TokenModel;
    public isRegistrationNotFinished: boolean;
    public isWaitTwoWayKey: boolean;
}