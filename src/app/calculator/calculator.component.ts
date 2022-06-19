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
  // private _computation = {held: 0, operation: '', last: 0, lastOpen: false} old
  private _computation:(any)[][] = [[0,''],[10,'+'],[10,'-']]

  // holdDisplay(op:string=''){
  //   this._computation.held = Number(this.display);
  //   this.display='0';
  //   (op && (this._computation.operation=op))
  // }
  pushComp(num:number, op:string){
    this._computation.push([num, op])
  }

  calcDisplay():number{
    let value = this._computation.reduce((prev, [curr,op]) => {
      switch (op) {
        case '+':
          return prev + curr
        case '-':
          return prev - curr
        case '×':
          return prev * curr
        case '÷':
          return prev / curr
        default:
          console.error('Error in calcDisplay');
          break;
      }
    }, 0)
    return value
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

  private _resetFlag = false;
  private _awaitNew = false;
  private _reSolve = false;
  
  doPercent(){
  //   switch (Boolean(this._computation.operation)) {
  //     case false:
  //       this.display = '0'
  //       break;
  //       case true:
  //         if(this._computation.operation === '+' || this._computation.operation === '-') {
  //           this._computation.last = this._computation.held*(Number(this.display)/100);
  //           this.display = String(this._computation.last);
  //         } else if (this._computation.operation === '×' || this._computation.operation === '÷') {
  //           this.display = String(Number(this.display)/100)
  //         } else {
  //           this.display = 'err'
  //         }
  //       break;
  //  }
  }

  doClearEntry(){
    this.display = '0';
  }

  doClear(){
    this.display = '0';
    // this._computation = {held: 0, operation: '', last: 0, lastOpen: false}
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

  doDivision(rep:string = ''){
    this.calcDisplay()
  //   if(this._computation.operation) this._reSolve = false;
  //   switch (this._computation.operation) {
  //     case '':
  //       this.holdDisplay('÷')
  //       break;
  //     case '÷':
  //       if(this._awaitNew || this._reSolve){
  //         this._resetFlag = true;
  //         this._computation.last = this._reSolve ? this._computation.last : Number(this.display);
  //         this._computation.held = this._computation.held/this._computation.last;
  //         this.display = String(this._computation.held)
  //         this._awaitNew = false;
  //       }
  //       break;
  //     default:
  //       for(let [_, op] of this.buttons){
  //         this._computation.lastOpen = true;
  //         (op === this._computation.operation && op.call(this))
  //         this._computation.operation = '÷';
  //       }
  //       break;
  //  }
  }

  doMultiply(rep:string = ''){
  //   if(this._computation.operation) this._reSolve = false;
  //   switch (this._computation.operation) {
  //     case '':
  //       this.holdDisplay('×')
  //       break;
  //     case '×':
  //       if(this._awaitNew || this._reSolve){
  //         this._resetFlag = true;
  //         this._computation.last = this._reSolve ? this._computation.last : Number(this.display);
  //         this._computation.held = this._computation.held*this._computation.last;
  //         this.display = String(this._computation.held)
  //         this._awaitNew = false;
  //       }
  //       break;
  //     default:
  //       for(let [_, op] of this.buttons){
  //         this._computation.lastOpen = true;
  //         (op === this._computation.operation && op.call(this))
  //         this._computation.operation = '×';
  //       }
  //       break;
  //  }
  }

  doSubtraction(rep:string = ''){
  //   if(this._computation.operation) this._reSolve = false;
  //   switch (this._computation.operation) {
  //     case '':
  //       this.holdDisplay('-')
  //       break;
  //     case '-':
  //       if(this._awaitNew || this._reSolve){
  //         this._resetFlag = true;
  //         this._computation.last = this._reSolve ? this._computation.last : Number(this.display);
  //         this._computation.held = this._computation.held-this._computation.last;
  //         this.display = String(this._computation.held)
  //         this._awaitNew = false;
  //       }
  //       break;
  //     default:
  //       for(let [_, op] of this.buttons){
  //         this._computation.lastOpen = true;
  //         (op === this._computation.operation && op.call(this))
  //         this._computation.operation = '-';
  //       }
  //       break;
  //  }
  }

  doAddition(rep:string = ''){
  //   if(this._computation.operation) this._reSolve = false; // Need to fix this
  //   switch (this._computation.operation) {
  //     case '':
  //       this.holdDisplay('+')
  //       break;
  //     case '+':
  //       if(this._awaitNew || this._reSolve){
  //         this._resetFlag = true;
  //         this._computation.last = this._reSolve ? this._computation.last : Number(this.display);
  //         this._computation.held = this._computation.held+this._computation.last;
  //         this.display = String(this._computation.held)
  //         this._awaitNew = false;
  //       }
  //       break;
  //     default:
  //       for(let [_, op] of this.buttons){
  //         this._computation.lastOpen = true;
  //         (op === this._computation.operation && op.call(this))
  //         this._computation.operation = '+';
  //       }
  //       break;
  //  }
  }

  doSwitchSign(){
  //   this.display = String(-Number(this.display))
  //   this._computation.held = Number(this.display)
  }

  doAddDecimal(){
    this.display += '.'
  }

  doSolve(){
  //   console.log(`op=${this._computation.operation}, awaitNew=${this._awaitNew}, reSolve=${this._reSolve}`,this._computation);
  //   this._computation.last ||= Number(this.display)
  //   for(let [char, op] of this.buttons){
  //     (char === this._computation.operation && op.call(this));
  //     if(!this._reSolve) {
  //       this._reSolve=true;
  //     }
      
  //   }
  //   console.log(`op=${this._computation.operation}, awaitNew=${this._awaitNew}, reSolve=${this._reSolve}`,this._computation);
  }


  numPress(event:any){
    // if(event.target.innerText !== '=') this._reSolve = false
    // console.log(this._reSolve);
    
    if(event.target.innerText.match(/^\d$/)) {
      if(this.display==='0' || this._resetFlag) {
        this.display= '';
        this._resetFlag=false;
        this._awaitNew = true;
      }
      // if(this._computation.lastOpen) {
      //   this._computation.lastOpen = false;
      //   this._computation.last = Number(event.target.innerText)
      // }
      // (this._reSolve && this.doClear());
      this.display += event.target.innerText
    } else {
      for(let [char, op] of this.buttons){
        if(char === event.target.innerText){
          op.call(this)
        }
      }
    }
  }
}
