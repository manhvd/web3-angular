import { Injectable } from '@angular/core';
import Web3 from "web3";
import abi from './../abi.json';
import { AbiItem } from 'web3-utils';
declare const window: any;


@Injectable({
    providedIn: 'root'
})
export class ContractsService {
    contractAddress= '0x7CFc4846F8162616756be9c210330E0c0fB8F3BB';
 
    window:any;
    private getAccounts = async () => {
        try {
            return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
            return [];
        }
    }

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
        return addresses.length ? addresses[0] : null;
    };
    public async getBnBRate(token:string) {        
       var web3 = await new Web3('https://data-seed-prebsc-2-s3.binance.org:8545');
       debugger;
       if(token == 'BNB_rate'){
        const contract = await new web3.eth.Contract(abi as AbiItem[], this.contractAddress);
        var rs:number = await contract.methods.BNB_rate().call();
        return rs;
       }
       if(token == 'USDT_rate'){
        const contract = await new web3.eth.Contract(abi as AbiItem[], this.contractAddress);
        var rs:number = await contract.methods.USDT_rate().call();
        return rs;
       }
       return 1;
    }
}