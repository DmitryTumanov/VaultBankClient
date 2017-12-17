import {Component, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'login-type',
    templateUrl: './login-type.component.html'
})
export class LoginTypeComponent extends BaseComponent {
    @Output()
    authTypeChange = new EventEmitter();
    public authType = 0;

    public updateAuthType(type: number) {
        this.authType = type;
        this.authTypeChange.emit(this.authType);
    }
}