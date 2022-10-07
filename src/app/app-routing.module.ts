import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcoComponent } from './ico/ico.component';
import { NftComponent } from './nft/nft.component';
import { VaultComponent } from './vault/vault.component';

const routes: Routes = [
  { path: 'vault', component: VaultComponent },
  { path: 'ico', component: IcoComponent },
  { path: 'nft', component: NftComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
