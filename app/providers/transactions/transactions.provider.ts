import {Injectable} from "@angular/core";
import {TransactionModel} from "../../models/transaction.model";
import {TransactionsService} from "../../services/transactions/transactions.service";

@Injectable()
export class TransactionsProvider {

    constructor(private transactionsService: TransactionsService) {
    }

    async getTransactionsForCard(cardId: number): Promise<any> {
        return await this.transactionsService.getTransactionsForCard(cardId);
    }

    async getTransactionsForTask(taskId: number): Promise<TransactionModel[]> {
        return await this.transactionsService.getTransactionsForCard(taskId);
    }
}