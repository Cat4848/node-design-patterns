import { PaymentMethod } from "./types";

export class PaymentContext {
  constructor(public paymentStrategy: PaymentMethod) {}
  performPay = (amount: number) => {
    this.paymentStrategy.pay(amount);
  };
}
