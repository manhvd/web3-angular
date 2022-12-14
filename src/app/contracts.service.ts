import { Injectable } from '@angular/core';
import Web3 from "web3";
import abi from './../abi.json';
import { ethers } from "ethers";
import { AbiItem } from 'web3-utils'
import {
    TransactionResponse,
  } from "@ethersproject/abstract-provider";
declare const window: any;


@Injectable({
    providedIn: 'root'
})
export class ContractsService {
    _contract: ethers.Contract;
    _contractPublic: any;
    contractAddress= '0x58aA8f4147Ed63BB94759223453b235F5caB8B68';
    _option: any;
    constructor(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this._contract = new ethers.Contract(this.contractAddress, abi, provider.getSigner());
        const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
        this._contractPublic = new web3.eth.Contract(abi as AbiItem[] ,this.contractAddress);
        this._option = { gasLimit: 1000000 };
    }
    window:any;
    private getAccounts = async () => {
        try {
            return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
            return [];
        }
    }
    private getBalance = async (account:any) => {
        try {
            return await window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']});
        } catch (e) {
            return 0;
        }
       
    };

    public openMetamask = async (init = false) => {
        window.web3 = new Web3(window.ethereum);
        let addresses = await this.getAccounts();
        console.log("service",addresses)
        if (!addresses.length && init) {
            try {
                addresses = await window.ethereum.enable();
            } catch (e) {
                return false;
            }
        }
        let balance = await this.getBalance(addresses[0]);
          
        return addresses.length ? addresses[0] + " with BNB amount: "+ ethers.utils.formatEther(balance) +"$" : null;
    };
    public async getRate(token:string) {        
       if(token == 'BNB_rate'){
        var rs:number = await this._contractPublic.methods.BNB_rate().call();
        return rs;
       }
       if(token == 'USDT_rate'){
        var rs:number = await this._contractPublic.methods.USDT_rate().call();
        return rs;
       }
       return 1;
    }
    public async buyByBNB(token:string) {   
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            const tx: TransactionResponse = await this._contract.buyTokenByBNB({
                ...this._option,
                value: token
              }).then((tx: any)=>{
                //action prior to transaction being mined
                    return tx;
             })
             .catch(()=>{
             //action to perform when user clicks "reject"
             })
             return this.handleTransactionResponse(tx);
        } else {
            return null;
        }
    }
    public async buyByUSTD(token:string) {   
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            var amount = ethers.utils.parseEther(token);
            const tx: TransactionResponse = await this._contract.buyTokenByUSDT(amount,{
                ...this._option
              }).then((tx: any)=>{
                //action prior to transaction being mined
                    return tx;
             })
             .catch((ex: any)=>{
                console.log(ex);
             //action to perform when user clicks "reject"
             })
              
              return this.handleTransactionResponse(tx);
        } else {
            return null;
        }
    }
    handleTransactionResponse = async(tx: TransactionResponse) => {
        const recept = await tx.wait();
        return recept.transactionHash;
    }
   
}