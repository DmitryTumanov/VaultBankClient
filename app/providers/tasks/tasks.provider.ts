import {Injectable} from "@angular/core";
import {TaskModel} from "../../models/task.model";
import {TasksService} from "../../services/tasks/tasks.service";

@Injectable()
export class TasksProvider {

    async getTasks(): Promise<TaskModel[]>{
        return await this.tasksService.getTasks();
    }

    constructor(private tasksService: TasksService) {
    }

    async addTask(taskModel: TaskModel):Promise<boolean>{
        return await this.tasksService.addTask(taskModel);
    }

    async editTask(taskModel: TaskModel):Promise<boolean>{
        return await this.tasksService.editTask(taskModel);
    }

    async removeTask(cardId: number, goalId: number) {
        return await this.tasksService.removeCard(cardId, goalId);
    }
}