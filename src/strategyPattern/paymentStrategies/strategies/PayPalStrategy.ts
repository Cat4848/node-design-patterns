import { PaymentMethod } from "../types";

export class PayPalStrategy extends PaymentMethod {
  pay = (amount: number) => {
    // execute the PayPal payment algorithm
  };
}
