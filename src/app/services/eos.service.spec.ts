import { TestBed } from '@angular/core/testing';
import { Api, JsonRpc } from 'eosjs';

import {JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

import { EosService } from './eos.service';

describe('EosService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: EosService = TestBed.get(EosService);
    expect(service).toBeTruthy();
  });

  it('#get the head block number', () => {
    const rpc = new JsonRpc('https://api.eosnewyork.io');
    const privateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api: Api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    const isRequestInProgress = true;
    const latestBlockId = 0;
    expect(isRequestInProgress).toEqual(true);
    api.rpc.get_info().then(value => {
      expect(latestBlockId).toEqual(value.head_block_num);
    })
    .then(() => {
      expect(this.retrieveBlock).toBeDefined();
      expect(this.retrieveBlock()).toHaveBeenCalled();
    });
  });

  it('retrieve the block information', () => {
    // return new Promise((resolve => {

    // });
  });

});
