export class TaskModel {
    public goalId: number;
    public title: string;
    public description: string;
    public targetEnd: Date;
    public chargeDate: number;
    public moneyTarget: number;//
    public moneyCurrent: number;//
    public moneyPerMonth: number;//
    public targetType: number;
    public creditCardId: number;
    public isPaused: boolean;

    constructor(){}
}