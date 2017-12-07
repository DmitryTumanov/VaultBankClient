import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../base/base.component";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {Router} from "@angular/router";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {ValidatorsProvider} from "../../providers/validators/validators.provider";
import {TaskModel} from "../../models/task.model";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {FormGroup} from "@angular/forms";
declare let $: any;

@Component({
    selector: "new-task",
    templateUrl: "./new-task.component.html"
})
export class NewTaskComponent extends BaseComponent implements OnInit {
    public firstStepValidator: any;
    public secondStepValidator: any;
    public thirdStepValidator: any;
    public fatalError = "";

    constructor(validatorProvider: ValidatorsProvider,
                translator: TranslationsProvider,
                settings: SettingsProvider,
                private router: Router,
                private preLoader: PreLoaderProvider,
                private taskProvider: TasksProvider) {
        super(translator, settings);
        this.firstStepValidator = validatorProvider.taskFirstStepValidator;
        this.secondStepValidator = validatorProvider.taskSecondStepValidator;
        this.thirdStepValidator = validatorProvider.taskThirdStepValidator;
    }

    ngOnInit() {
        $('.stepper').activateStepper({
            linearStepsNavigation: false
        });
    }

    public addNewTask() {
        let taskModel: TaskModel = this.getModelFromValidators();
        this.preLoader.start();
        this.taskProvider.addTask(taskModel).then((result: boolean) => {
            this.preLoader.stop();
            if (result) {
                return this.router.navigateByUrl("/tasks");
            }
            this.fatalError = "Fatal Error";
        });
    }

    public isValid(validator: FormGroup): boolean {
        let keys = Object.keys(validator.controls);
        for (let key of keys) {
            if (!validator.controls[key].valid) {
                return false;
            }
        }
        return true;
    }

    public isTouched(validator: FormGroup, ignoreCase: string = ""): boolean {
        let keys = Object.keys(validator.controls);
        let nonTouchedItemCount = 0;
        if(ignoreCase != ""){
            let index = keys.indexOf(ignoreCase);
            keys.splice(index, 1);
        }
        for (let key of keys) {
            if (!validator.controls[key].touched) {
                nonTouchedItemCount = nonTouchedItemCount + 1;
            }
        }
        return nonTouchedItemCount != keys.length;
    }

    private getModelFromValidators(): TaskModel {
        let model = new TaskModel();
        model.title = this.firstStepValidator.value.title;
        model.description = this.firstStepValidator.value.description;
        model.creditCardId = this.firstStepValidator.value.creditCardId;
        model.targetEnd = new Date(this.convertDate(this.firstStepValidator.value.targetEnd));
        model.targetType = this.secondStepValidator.value.targetType;
        model.moneyTarget = this.secondStepValidator.value.moneyTarget;
        model.moneyPerMonth = this.secondStepValidator.value.moneyPerMonth;
        let day = +$(".range-field .thumb .value").text();
        model.chargeDate = new Date(new Date().setDate(day));
        return model;
    }

    private convertDate(targetEnd: string): string {
        let results = targetEnd.split("/");
        return results[1] + "/" + results[0] + "/" + results[2];
    }
}