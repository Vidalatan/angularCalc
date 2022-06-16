import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  prevNum = 0;

  setPrevNum(newNum:number){
    this.prevNum = newNum;
  }

  log:String[] = []

  addToContextLog(newLog:String){
    this.log.push(newLog);
  }

  clearContextLog(){
    this.log = [];
  }

  logTest(){
    console.log('Service Accessed')
  }
}