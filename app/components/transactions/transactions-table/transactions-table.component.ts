import {BaseComponent} from "../../base/base.component";
import {Component, Input} from "@angular/core";
import {TransactionModel} from "../../../models/transaction.model";
import {TaskModel} from "../../../models/task.model";

@Component({
    selector: "transactions-table",
    templateUrl: "./transactions-table.component.html"
})
export class TransactionsTableComponent extends BaseComponent {
    @Input()
    public transactions: TransactionModel[];

    getTransactionStatus(item: TransactionModel): string {
        if (item.transactionIsRetried) {
            return this.translator.transactionRetriedStatus;
        }
        if (item.isPausedOrError) {
            return this.translator.transactionErrorStatus;
        }
        return this.translator.transactionValidStatus;
    }

    getTransactionStatusClass(item: TransactionModel): string {
        if (item.transactionIsRetried) {
            return "retried";
        }
        if (item.isPausedOrError) {
            return "pause";
        }
        return "valid";
    }

    getTaskTypeColor(task: TaskModel): string {
        let taskType = this.settings.taskTypes.filter((x: any) => x.typeKey == task.targetType)[0];
        return taskType.color;
    }
}