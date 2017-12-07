export class CardModel {
    public creditCardId:number;
    public cardType: number;
    public customCardName: string;
    public ownerFullName: string;
    public CVV: string;
    public cardNumber: string;
    public expirationDate: Date;
    public isPaused: boolean;

    constructor() {
    }
}