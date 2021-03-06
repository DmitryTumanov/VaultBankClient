import {Injectable} from "@angular/core";
import {TransactionsService} from "../../services/transactions/transactions.service";

@Injectable()
export class TransactionsProvider {

    constructor(private transactionsService: TransactionsService) {
    }

    async getTransactionsForCard(cardId: number): Promise<any[]> {
        return await this.transactionsService.getTransactionsForCard(cardId);
    }

    async getTransactionsForTask(taskId: number): Promise<any[]> {
        return await this.transactionsService.getTransactionsForCard(taskId);
    }
}