import { Component, OnInit } from '@angular/core';

import { EosService } from '../../services/eos.service';

@Component({
  selector: 'app-get-block',
  templateUrl: './get-block.component.html',
  styleUrls: ['./get-block.component.less']
})
export class GetBlockComponent implements OnInit {
  public results = [];
  constructor(public eos: EosService) { }

  ngOnInit() {
    this.eos.getHeadBlock();
  }

  /**
   * Fetch the latest blocks
   */
  public refreshResults() {
    this.eos.blockList = [];
    this.eos.getHeadBlock();
  }
}
