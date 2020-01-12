import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBlockComponent } from './get-block.component';
import { EosService } from '../../services/eos.service';

describe('GetBlockComponent', () => {
  let component: GetBlockComponent;
  let fixture: ComponentFixture<GetBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh the results',  () => {
    const eosService = TestBed.get(EosService);
    eosService.blockList = [];
    expect(eosService.blockList).toEqual([]);
  });
});
