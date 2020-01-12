import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {  Api, JsonRpc, RpcError } from 'eosjs';

// import { Injectable } from '@angular/core';
import * as Eos from 'eosjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class EosService {
//   public eos: any;

//   constructor() {
//     this.eos = Eos.Localnet({
//       httpEndpoint: environment.blockchainUrl
//     })
//   }
// }



// const config = {
//     keyProvider: ['INSERT_PRIVATE_KEY_HERE'],
//     httpEndpoint: 'http://127.0.0.1:8888',
//     expireInSeconds: 60,
//     broadcast: true,
//     debug: false,
//     sign: true
// }

// const eos = .Localnet(config);

// eos.getInfo({}, function(err, result) {
//     err ? console.log("Error:",err) : console.log("Response:",result);
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'blockone';
  public blockid: string;
  public latestBlockId: any;
  public blockList: Array<object> = [];
  public count = 0;
  public rpc;
  public eos: any;

  constructor(private http: HttpClient) {
    console.log('What is fetch', fetch );
    // this.rpc = new JsonRpc('https://api.eosnewyork.io/', {fetch});
    this.eos = Eos.Localnet({
      httpEndpoint: 'https://api.eosnewyork.io/'
    });
  }

  ngOnInit() {
    this.fetchBlockInfo();
  }

  fetchBlockInfo() {
    this.eos.getInfo({})
    .then((res: any) => {
        console.log('res', res.head_block_num);
        this.latestBlockId = res.head_block_num;
    })
    .then(() => {
      this.retrieveBlock();
    });
  }
  retrieveBlock() {
    return new Promise((resolve => {
      this.http.post('https://api.eosnewyork.io/v1/chain/get_block', {'block_num_or_id': this.latestBlockId}).toPromise()
      .then((result: any) => {
        console.log('Result is', result);
        this.latestBlockId = result.previous;
        this.blockList.push(result);
      })
      .then(() => {
        resolve('resolved');
        if (this.count < 9) {
          this.count++;
          this.retrieveBlock();
        } else {
          this.count = 0;
        }
      });
    }));
  }
}
