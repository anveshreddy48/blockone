
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EosService } from './services/eos.service';
import { GetBlockComponent } from './components/get-block/get-block.component';

@NgModule({
  declarations: [
    AppComponent,
    GetBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [EosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
