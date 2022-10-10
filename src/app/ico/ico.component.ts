import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../contracts.service';
import Web3 from "web3";
export interface Tokens {
  Name: string;
  image: string;
  rate: number;
  volume: number;
  tokenName: string;
}
@Component({
  selector: 'app-ico',
  templateUrl: './ico.component.html',
  styleUrls: ['./ico.component.css']
})
export class IcoComponent implements OnInit {
 bnbRate = 1;
 usdtRate = 1;
 txtHash = '';
 txtHashDisplay = "";
 linkScan = "https://testnet.bscscan.com/tx/0xd4565f52f6e176c53b1a48ce68e9a2946aa723c10ad5ae440a1b831e093dad84";
  constructor(private contractService: ContractsService) {
    this.contractService.getRate('BNB_rate').then(resp =>{
      this.bnbRate =  resp;
    });
    this.contractService.getRate('USDT_rate').then(resp =>{
      this.usdtRate =  resp;
    });
  }

  ngOnInit(): void {
    this.contractService.openMetamask(false).then(resp =>{
      this.title = "Connect address: " + resp;
    })
      
  }
  title = "Connect MetaMask";
  openMetaMask(init:any){
    this.contractService.openMetamask(init).then(resp =>{
      this.title = "Connect address: " + resp;
    })
    //console.log("sasasasas")
  }
  packageBnb: Tokens[] = [
    {Name: 'BNB PACKAGE 01', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 100, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 02', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 500, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 03', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 1000, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 04', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 2000, tokenName:"BNB"}
  ]; 
  packageUsdt: Tokens[] = [
    {Name: 'USDT PACKAGE 01', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 100, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 02', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 500, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 03', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 1000, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 04', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 15000, tokenName:"USDT"}
  ]; 
  getRawValueBuy(value: number, token: string){
    if(token == "BNB")
      return value/this.bnbRate;
    return value/this.usdtRate;
  } 

  buyByBNB(volume: number){
    this.onOverlay();
    if(volume > 0){
      const bnbBuyRaw = Web3.utils.toWei(JSON.stringify(volume/this.bnbRate), 'ether');     
      this.contractService.buyByBNB(bnbBuyRaw).then(resp =>{
        this.txtHash = resp ? resp: '';
        this.linkScan = "https://testnet.bscscan.com/tx/" + this.txtHash;
        this.txtHashDisplay = this.txtHash.substring(0,18) + "xxxxxxxxxxx";
        this.offOverlay();
        ($('#alertModal') as any).modal('show');
      }).catch((ex)=>{
        this.offOverlay();
        })
    } else {
      alert("Wrong volume!");
    }
  }
  buyByUSDT(volume: number){
    this.onOverlay();
    if(volume > 0){
      const bnbBuyRaw = Web3.utils.toWei(JSON.stringify(volume/this.usdtRate), 'ether');     
      this.contractService.buyByUSTD(bnbBuyRaw).then(resp =>{
        this.txtHash = resp ? resp: '';
        this.linkScan = "https://testnet.bscscan.com/tx/" + this.txtHash;
        this.txtHashDisplay = this.txtHash.substring(0,18) + "xxxxxxxxxxx";
        this.offOverlay();
        ($('#alertModal') as any).modal('show');
      }).catch((ex)=>{
        this.offOverlay();
        })
    } else {
      alert("Wrong volume!");
    }
  }
  goToBscScan(){
    window.open(this.linkScan, "_blank");

  }
  onOverlay() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "block";
  }
  
  offOverlay() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "none";
  }
}
