export abstract class PaymentMethod {
  abstract pay: (amount: number) => void;
}
