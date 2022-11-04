import { Injectable } from '@angular/core';
import Web3 from "web3";
import abi from '../../nft_abi.json';
import { BigNumber, ethers } from "ethers";
import { AbiItem } from 'web3-utils'
import {
    TransactionResponse,
  } from "@ethersproject/abstract-provider";
declare const window: any;


@Injectable({
    providedIn: 'root'
})
export class NFTContractsService {
    _contract: ethers.Contract;
    _contractPublic: any;
    contractAddress= '0x9E7388Bb54dFE5d7eD25Eb599B4A21C245aCbf28';
    _option: any;
    constructor(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this._contract = new ethers.Contract(this.contractAddress, abi, provider.getSigner());
        const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
        this._contractPublic = new web3.eth.Contract(abi as AbiItem[] ,this.contractAddress);
        this._option = { gasLimit: 1000000 };
    }
    window:any;
    
    
    getListNFT = async (address: string): Promise<INftItem[]> => {
        const ids = await this._listTokenIds(address);
        return Promise.all(
          ids.map(async (id) => {
            const tokenUrl = await this._contract.tokenURI(id);
            const obj = await (await fetch(`${tokenUrl}`)).json();
            const item: INftItem = { ...obj, id };
            return item;
          })
        );
      };
    
      private _listTokenIds = async (address: string) => {
        const urls: BigNumber[] = await this._contract.listTokenIds(address);
        const ids = await Promise.all(urls.map((id) => id.toNumber()));
        return ids;
      };
      public async getTotalSuplly() {
        var rs:number = await this._contractPublic.methods.totalSupply().call();
        return rs;
      };
    handleTransactionResponse = async(tx: TransactionResponse) => {
        const recept = await tx.wait();
        return recept.transactionHash;
    }
   
}
export interface INftItem {
    id: number;
    name?: string;
    description?: string;
    image: string;
    attributes?: IAttribute[];
    //Listing
    price?: number;
    author?: string;  
  }
  export interface IAttribute {
    trait_type: string;
    value: string | number;
  }