import { PaymentMethod } from "../types";

export class GooglePayStrategy extends PaymentMethod {
  pay = (amount: number) => {
    // implements the algorithm for GooglePayStrategy
  };
}
