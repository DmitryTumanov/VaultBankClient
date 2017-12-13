import {Injectable} from "@angular/core";
import {BaseService} from "../base/base.service";
import {TransactionModel} from "../../models/transaction.model";

@Injectable()
export class TransactionsService extends BaseService {

    public getTransactionsForCard(cardId: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.getAuthorized(this.settings.transactionsGetByCardPath + "/" + cardId)
                .subscribe((response: any) => {
                    resolve(response);
                });
        });
    }

    public getTransactionsForTask(taskId: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.getAuthorized(this.settings.transactionsGetByTaskPath + "/" + taskId)
                .subscribe((response: TransactionModel[]) => {
                    resolve(response);
                });
        });
    }
}