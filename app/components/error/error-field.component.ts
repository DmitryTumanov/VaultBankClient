import {Component, Input} from "@angular/core";

@Component({
    selector:"error-field",
    templateUrl:"./error-field.component.html"
})
export class ErrorFieldComponent{
    @Input()
    expression: boolean;
    @Input()
    text: string;
}