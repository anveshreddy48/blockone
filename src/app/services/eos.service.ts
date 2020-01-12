import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { Api, JsonRpc } from 'eosjs';
import {JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

import { GetBlockResult } from './getBlockResult.model';

@Injectable({
  providedIn: 'root'
})
export class EosService {
  public api: any;
  public latestBlockId: any;
  public blockList: Array<Object> = [];
  public count = 0;
  public actionCount: number;
  public isRequestInProgress = false;

  constructor() {
    const rpc = new JsonRpc('https://api.eosnewyork.io');
    const privateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";
    const signatureProvider = new JsSignatureProvider([privateKey]);
    this.api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  }

  /**
   * Helper method to get the head block num
   */
  public getHeadBlock() {
    this.isRequestInProgress = true;
    this.api.rpc.get_info().then((res: any) => {
      this.latestBlockId = res.head_block_num;
    }).then(() => {
      this.retrieveBlock();
    }).catch((err: any) => {
      console.log('Error fetching head block num', err);
    });
  }

  /**
   * Helper method to retrieve the block information
   */
  public retrieveBlock(): Promise<string> {
    return new Promise((resolve => {
      this.api.rpc.get_block(this.latestBlockId)
      .then((result: any) => {
        this.latestBlockId = result.block_num - 1;
        this.blockList.push(new GetBlockResult(result));
        return result;
      })
      .catch((err: any) => {
        console.error('Error fetching the block', err);
      })
      .then(() => {
        if (this.count < 9) {
          this.count++;
          this.retrieveBlock();
        } else {
          this.count = 0;
          this.isRequestInProgress = false;
        }
      });
      resolve('resolved');
    }));
  }
}



