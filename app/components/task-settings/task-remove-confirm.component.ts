import {Component, EventEmitter, Input} from "@angular/core";
import {TaskModel} from "../../models/task.model";
import {BaseComponent} from "../base/base.component";
import {MaterializeAction} from "angular2-materialize";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {TranslationsProvider} from "../../providers/translations/translations.provider";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {TasksProvider} from "../../providers/tasks/tasks.provider";
import {Router} from "@angular/router";

@Component({
    selector: "task-remove-confirm",
    templateUrl: './task-remove-confirm.component.html'
})
export class TaskRemoveConfirmComponent extends BaseComponent {
    @Input()
    public task: TaskModel;
    @Input()
    public modalAction: EventEmitter<string | MaterializeAction>;

    private cardId: number = -1;

    public modalParams = [
        {
            dismissible: false,
            complete: function () {
                console.log('Closed');
            }
        }
    ];

    constructor(settings: SettingsProvider,
                translator: TranslationsProvider,
                private router: Router,
                private preLoader: PreLoaderProvider,
                private tasksProvider: TasksProvider) {
        super(translator, settings);
    }

    public closeModal() {
        this.modalAction.emit({action: "modal", params: ['close']});
    }

    removeTask() {
        this.closeModal();
        this.preLoader.start();
        this.tasksProvider.removeTask(this.cardId, this.task.goalId).then((result: any) => {
            this.preLoader.stop();
            return this.router.navigateByUrl("/tasks");
        });
    }

    public updateTaskCard(cardId: number) {
        this.cardId = cardId;
    }
}