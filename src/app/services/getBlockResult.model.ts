export class GetBlockResult {
  public timestamp: string;
  public producer: string;
  public confirmed: number;
  public previous: string;
  public transaction_mroot: string;
  public action_mroot: string;
  public schedule_version: number;
  public producer_signature: string;
  public id: string;
  public block_num: number;
  public ref_block_prefix: number;
  public new_producers: any = null;
  public header_extensions: Array<any> = [];
  public transactions: Array<any> = [];

  public isOpen = false; // Indicates to display raw data in the ui
  public actionCount = 0; // calculate the total of action

  constructor(public model: any) {
    this.timestamp = model.timestamp;
    this.producer = model.producer;
    this.confirmed = model.confirmed;
    this.previous = model.previous;
    this.transaction_mroot = model.transaction_mroot;
    this.action_mroot = model.action_mroot;
    this.schedule_version = model.schedule_version;
    this.producer_signature = model.producer_signature;
    this.id = model.id;
    this.block_num = model.block_num;
    this.ref_block_prefix = model.ref_block_prefix;
    this.new_producers = model.new_producers;
    this.header_extensions = model.header_extensions;
    this.transactions = model.transaction;
    this.actionCount = model.transactions.reduce((ct, res) => {
      return ct = ct + ((res.trx.transaction && res.trx.transaction.actions) ? res.trx.transaction.actions.length : 0);
    }, 0);
  }
}

