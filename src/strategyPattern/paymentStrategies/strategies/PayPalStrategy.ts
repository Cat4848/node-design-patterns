import { Payment } from "../types";

export class PayPalStrategy extends Payment {
  pay = (amount: number) => {
    // execute the PayPal payment algorithm
  };
}
