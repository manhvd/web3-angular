import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../contracts.service';
import {MatCardModule} from '@angular/material/card';
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
  constructor(private contractService: ContractsService) {
    this.contractService.getRate('BNB_rate').then(resp =>{
      this.bnbRate =  resp;
    });
    this.contractService.getRate('USDT_rate').then(resp =>{
      this.usdtRate =  resp;
    });
  }

  ngOnInit(): void {
  
  }
  title = "Connect MetaMask";
  openMetaMask(init:any){
    this.contractService.openMetamask(init).then(resp =>{
      this.title = "Connect address: " + resp;
    })
    //console.log("sasasasas")
  }
  tokens: Tokens[] = [
    {Name: 'BNB PACKAGE 01', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 100, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 02', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 500, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 03', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 1000, tokenName:"BNB"},
    {Name: 'BNB PACKAGE 04', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 2000, tokenName:"BNB"},
    {Name: 'USDT PACKAGE 01', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 100, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 02', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 500, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 03', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 1000, tokenName:"USDT"},
    {Name: 'USDT PACKAGE 04', image: "./../../assets/img/tokens/usdt.jpg", rate: 1, volume: 15000, tokenName:"USDT"},
  ]; 
  getRawValueBuy(value: number, token: string){
    if(token == "BNB")
      return value/this.bnbRate;
    return value/this.usdtRate;
  } 
}
