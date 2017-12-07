import {Component, Input} from '@angular/core';
import {BaseComponent} from "../base/base.component";

@Component({
    selector: 'pre-loader',
    templateUrl: './pre-loader.component.html'
})
export class PreLoaderComponent extends BaseComponent{
    @Input()
    isDataPreLoading:boolean;
}