import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../contracts.service';
import { NFTContractsService } from './nftcontract.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  title = "Connect MetaMask";
  lstAllItem: any;
  totalSupply = 0
  constructor(private nftContractService: NFTContractsService, private contractService: ContractsService) {
    this.nftContractService.getTotalSuplly().then(resp =>{
      this.totalSupply =  resp;
    });
    this.nftContractService.getListNFT("0xD14ED6b72739e85Abba616900487836ecA46b457").then(resp =>{
      this.lstAllItem =  resp;
    });
   }

  ngOnInit(): void {
    this.contractService.openMetamask(false).then(resp =>{
      if(resp){
        this.title = "Connect address: " + resp;
      }
    })
  }
  openMetaMask(init:any){
    this.contractService.openMetamask(init).then(resp =>{
      this.title = "Connect address: " + resp;
    })
    //console.log("sasasasas")
  }
}
