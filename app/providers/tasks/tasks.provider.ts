import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
import {TaskModel} from "../../models/task.model";
import {TasksService} from "../../services/tasks/tasks.service";

@Injectable()
export class TasksProvider {
    private _tasks: TaskModel[];

    async getTasks(): Promise<TaskModel[]>{
        if (isNullOrUndefined(this._tasks)) {
            this._tasks = await this.tasksService.getTasks();
        }
        return this._tasks;
    }

    async refresh(){
        this._tasks = await this.tasksService.getTasks();
    }

    constructor(private tasksService: TasksService) {
    }

    async addTask(taskModel: TaskModel):Promise<boolean>{
        return await this.tasksService.addTask(taskModel).then((result: boolean) => {
            if (result) {
                this._tasks.push(taskModel);
            }
            return result;
        });
    }

    async editTask(taskModel: TaskModel):Promise<boolean>{
        return await this.tasksService.editTask(taskModel).then((result: boolean) => {
            return result;
        });
    }
}