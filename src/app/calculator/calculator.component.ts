import { Component, OnInit, HostListener } from '@angular/core';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public context: ContextService;
  
  constructor(private _contextService: ContextService) {
  }
  
  ngOnInit(): void {
    this.context = this._contextService
  }

  // Used to show the current display
  public display:string = '0';
  // Used to store number and operation temporarily before calling doSolve
  private _computation = {held: 0, operation: '', last: 0}

  holdDisplay(op:string=''){
    this._computation.held = Number(this.display);
    this.display='0';
    (op && (this._computation.operation=op))
  }

  @HostListener('window:keydown', ['$event'])
  keyPadDown(event: KeyboardEvent){
    for(let [char] of this.buttons){
      (char === event.key && document.getElementById(`keyPad-${char[0]}`)?.click())
    };
    (event.key === '*' && document.getElementById(`keyPad-×`)?.click());
    (event.key === '/' && document.getElementById(`keyPad-÷`)?.click());
    (event.key === 'Backspace' && document.getElementById(`keyPad-«`)?.click());
    (event.key === 'Delete' && document.getElementById(`keyPad-CE`)?.click());
  }
  
  // Each button symbol or number
  public buttons: any[][] = 
  [
    ['%', this.doPercent], ['CE', this.doClearEntry],
    [ 'C', this.doClear], ['«', this.doBackSpace],
    ['1/x', this.doInverse], ['x^2', this.doSquare],   
    ['√x', this.doSqrt], ['÷', this.doDivision],
    ['7'],  ['8'],  ['9'], ['×', this.doMultiply],
    ['4'],  ['5'],  ['6'], ['-', this.doSubtraction],
    ['1'],  ['2'],  ['3'], ['+', this.doAddition],
    ['±', this.doSwitchSign],  ['0'],  ['.',this.doAddDecimal], ['=', this.doSolve]
  ]

  private _resetFlag = false
  private _awaitNew = false
  
  doPercent(){
    switch (Boolean(this._computation.operation)) {
      case false:
        this.display = '0'
        break;
        case true:
          if(this._computation.operation === '+' || this._computation.operation === '-') {
            this._computation.last = this._computation.held*(Number(this.display)/100);
            this.display = String(this._computation.last);
          } else if (this._computation.operation === '×' || this._computation.operation === '÷') {
            this.display = String(Number(this.display)/100)
          } else {
            this.display = 'err'
          }
        break;
   }
  }

  doClearEntry(){
    this.display = '0';
  }

  doClear(){
    this.display = '0';
    this._computation = {held: 0, operation: '', last: 0}
  }

  doBackSpace(){
    this.display = this.display.substring(0, this.display.length-1)
  }

  doInverse(){
    this.display = String(1/Number(this.display))
  }

  doSquare(){
    this.display = String(Number(this.display)**2)
  }

  doSqrt(){
    this.display = String(Math.sqrt(Number(this.display)))
  }

  doDivision(ovr:boolean = false){
    switch (Boolean(this._computation.operation)) {
      case false:
        this.holdDisplay('÷')
        break;
      case true:
        if(this._awaitNew){
          this._resetFlag = true;
          this._computation.last = ovr ? this._computation.last : Number(this.display);
          this._computation.held = this._computation.held/this._computation.last;
          this.display = String(this._computation.held)
          this._awaitNew = false;
        }
        break;
   }
  }

  doMultiply(ovr:boolean = false){
    switch (Boolean(this._computation.operation)) {
      case false:
        this.holdDisplay('×')
        break;
      case true:
        if(this._awaitNew){
          this._resetFlag = true;
          this._computation.last = ovr ? this._computation.last : Number(this.display);
          this._computation.held = this._computation.held*this._computation.last;
          this.display = String(this._computation.held)
          this._awaitNew = false;
        }
        break;
   }
  }

  doSubtraction(ovr:boolean = false){
    switch (Boolean(this._computation.operation)) {
      case false:
        this.holdDisplay('-')
        break;
      case true:
        if(this._awaitNew){
          this._resetFlag = true;
          this._computation.last = ovr ? this._computation.last : Number(this.display);
          this._computation.held = this._computation.held-this._computation.last;
          this.display = String(this._computation.held)
          this._awaitNew = false;
        }
        break;
   }
  }

  doAddition(ovr:boolean = false){
    switch (Boolean(this._computation.operation)) {
      case false:
        this.holdDisplay('+')
        break;
      case true:
        if(this._awaitNew){
          this._resetFlag = true;
          this._computation.last = ovr ? this._computation.last : Number(this.display);
          this._computation.held = this._computation.held+this._computation.last;
          this.display = String(this._computation.held)
          this._awaitNew = false;
        }
        break;
   }
  }

  doSwitchSign(){
    this.display = String(-Number(this.display))
  }

  doAddDecimal(){
    this.display += '.'
  }

  doSolve(){
    for(let [_, op] of this.buttons){
      
    }
  }


  numPress(event:any){
    // console.log(this._computation);
    
    
    if(event.target.innerText.match(/^\d$/)) {
      if(this.display==='0' || this._resetFlag) {
        this.display= '';
        this._resetFlag=false;
        this._awaitNew = true;
      }
      this.display += event.target.innerText
    } else {
      for(let btn of this.buttons){
        if(btn[0] === event.target.innerText){
          btn[1].call(this)
        }
      }
    }
  }
}
