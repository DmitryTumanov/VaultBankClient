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

    public static Convert(responseItem:any, cards: CardModel[], tasks: TaskModel[] = null): TransactionModel{
        let result = new TransactionModel();
        result.id = responseItem.transactionId;
        result.isPausedOrError = responseItem.isPausedOrError;
        result.transactionDateTime = new Date();
        result.money = responseItem.money;
        result.transactionIsRetried = responseItem.isTransactionRetried;
        result.status = responseItem.status;
        result.creditCard = cards.filter(x => x.creditCardId == responseItem.cardId)[0] || new CardModel();
        if(tasks) {
            result.task = tasks.filter(x => x.goalId == responseItem.goalId)[0] || new TaskModel();
        }
        return result;
    }
}

