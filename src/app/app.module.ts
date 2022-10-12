import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaultComponent } from './vault/vault.component';
import { IcoComponent } from './ico/ico.component';
import { NftComponent } from './nft/nft.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as $ from "jquery";
@NgModule({
  declarations: [
    AppComponent,
    VaultComponent,
    IcoComponent,
    NftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule, MatButtonModule,
    MatCardModule,
    MatGridListModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
