import { Injectable } from '@angular/core';
import Web3 from "web3";
import abi from './../abi.json';
import { ethers } from "ethers";
import {
    TransactionResponse,
  } from "@ethersproject/abstract-provider";
declare const window: any;


@Injectable({
    providedIn: 'root'
})
export class ContractsService {
    _contract: ethers.Contract;
    contractAddress= '0x5857b5Dda36aFAe646e758c6d19d2B09f2504025';
    _option: any;
    constructor(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this._contract = new ethers.Contract(this.contractAddress, abi, provider.getSigner());
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
        var rs:number = await this._contract.BNB_rate();
        return rs;
       }
       if(token == 'USDT_rate'){
        var rs:number = await this._contract.USDT_rate();
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