import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../contracts.service';
import {MatCardModule} from '@angular/material/card';
export interface Tokens {
  Name: string;
  image: string;
  rate: number;
  volume: number;
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

  }

  ngOnInit(): void {
   this.contractService.getBnBRate('BNB_rate').then(resp =>{
    this.bnbRate =  resp;
  });
  this.contractService.getBnBRate('USDT_rate').then(resp =>{
    this.usdtRate =  resp;
  });
  }
  title = "Connect MetaMask";
  openMetaMask(init:any){
    this.contractService.openMetamask(init).then(resp =>{
      this.title = "Connect address: " + resp;
    })
    //console.log("sasasasas")
  }
  tokens: Tokens[] = [
    {Name: 'BNB PACKAGE 01', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 1000},
    {Name: 'BNB PACKAGE 02', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 5000},
    {Name: 'BNB PACKAGE 03', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 10000},
    {Name: 'BNB PACKAGE 04', image: "./../../assets/img/tokens/bnb.png", rate: 1, volume: 20000}
  ];  
}
