import {CardModel} from "./card.model";
import {TaskModel} from "./task.model";

export class TransactionModel{
    public id :number;
    public isPausedOrError : boolean;
    public transactionDateTime:Date;
    public money:number;
    public transactionIsRetried:boolean;
    public status: string;
    public creditCard:CardModel;
    public task: TaskModel;
}

