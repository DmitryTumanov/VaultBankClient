import {BaseComponent} from "../../base/base.component";
import {Component, Input} from "@angular/core";
import {TransactionModel} from "../../../models/transaction.model";
import {TaskModel} from "../../../models/task.model";
import {CardTypeModel} from "../../../models/card-type.model";

@Component({
    selector: "transactions-table",
    templateUrl: "./transactions-table.component.html"
})
export class TransactionsTableComponent extends BaseComponent {
    @Input()
    public transactions: TransactionModel[];
    @Input()
    public isDefault: boolean = false;

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

    public getCardImage(cardType: string): string {
        let cardSetting = this.settings.cardTypes.filter((x: CardTypeModel) => x.typeKey == cardType)[0];
        return cardSetting.smallImage;
    }
}