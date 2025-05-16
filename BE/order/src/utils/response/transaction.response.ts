
export class TransactionResponse {
  id: number = 0;
  name: string = '';

  constructor(data?: Partial<TransactionResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
