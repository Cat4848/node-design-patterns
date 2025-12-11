import { PaymentMethod } from "../types";

export class StripeStrategy extends PaymentMethod {
  pay = (amount: number) => {
    // implements the algorithm for StripeStrategy
  };
}