import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  log:any[][] = []

  addToContextLog(newLog:(number|string)[]){
    this.log.push(newLog);
  }

  clearContextLog(){
    this.log = [];
  }

  logTest(){
    console.log('Service Accessed')
  }
}