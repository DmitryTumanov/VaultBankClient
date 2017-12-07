import {Injectable} from "@angular/core";
import {TaskModel} from "../../models/task.model";
import {BaseService} from "../base/base.service";

@Injectable()
export class TasksService extends BaseService {

    public getTasks(): Promise<TaskModel[]> {
        return new Promise((resolve, reject) => {
            this.getAuthorized(this.settings.tasksPath)
                .subscribe((response: TaskModel[]) => {
                    resolve(response);
                });
        });
    }

    public addTask(taskModel: TaskModel):Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.postAuthorized(this.settings.taskAddPath, taskModel)
                .subscribe((response: boolean) => {
                    resolve(response);
                });
        });
    }
}