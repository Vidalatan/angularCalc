import { Component, OnInit, HostListener } from '@angular/core';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public context: ContextService; // Declaration of context variable for context service
  
  constructor(private _contextService: ContextService) {
  }
  
  ngOnInit(): void {
    this.context = this._contextService
  }

  // private _computation = {held: 0, operation: '', last: 0, lastOpen: false}       Deprecated 6/19 Will remove 6/20

  public display:string = '0';        // Displayed to the calculator
  private _computation:(any)[][] = [] // Used to compute final display
  private _resetFlag = false;         // Determines if display should be reset to new number on input
  private _awaitNew = false;          // Determines if awaiting a new operation button press or recalc prev on equals button
  private _noLogClear=false;          // Determines if clearing without logging to history


  /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
  // holdDisplay(op:string=''){
  //   this._computation.held = Number(this.display);
  //   this.display='0';
  //   (op && (this._computation.operation=op))
  // }
  pushComp(num:number, op:string, notLast:boolean=false){
    if(notLast){
      this._computation.splice(this._computation.length-1,0,[num,op])
    } else {
      this._computation.push([num, op])
    }
  }

  calcDisplay(logHist:boolean=false):number{
    let value = this._computation.reduce((prev, [curr],cIn) => {
      switch (this._computation[cIn-1] ? this._computation[cIn-1][1]:0) {
        case '+':
          return prev + curr
        case '-':
          return prev - curr
        case '×':
          return prev * curr
        case '÷':
          return prev / curr
        default:
          return curr
      }
    }, 0)
    this.display = String(value)
    this._resetFlag = true;
    this._awaitNew = true;
    // if(logHist) {}  adding for future use of history log
    return value
  }

  @HostListener('window:keydown', ['$event'])
  keyPadDown(event: KeyboardEvent){
    for(let [char] of this.buttons){
      (char === event.key && document.getElementById(`keyPad-${char[0]}`)?.click())
    };
    (event.key === '*' && document.getElementById(`keyPad-×`)?.click());
    (event.key === '/' && document.getElementById(`keyPad-÷`)?.click());
    (event.key === 'Enter' && document.getElementById(`keyPad-=`)?.click());
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
  
  doPercent(){
    let op = this._computation.length > 1 ? this._computation[this._computation.length-1][1]:false
    if(op) {
      let ofHund = Number(this.display)/100;
      ((op === '+' || op === '-') && (this.display = String(this._computation[this._computation.length-2][1]*ofHund)));
      ((op === '×' || op === '÷') && (this.display = String(ofHund)))
    } else {
      this.display = '0'
    }




  //   switch (op) {
  //     case false:
  //       this.display = '0'
  //       break;
  //       case :
  //         if(op === '+' || op === '-') {
  //           // if adding op needed
  //         } else if (op === '×' || op === '÷') {
  //           this.display = String(Number(this.display)/100)          Deprecated 6/19
  //         } else {                                                   Will remove 6/20
  //           this.display = 'err'
  //         }
  //       break;
  //  }
  }

  doClearEntry(){
    if(this._noLogClear){
      this.display = '0';
      this._computation = []
    } else {
      this.display = '0';
      this._noLogClear = true;
    }
  }

  doClear(){
    this.display = '0';
    this._computation = []
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

  doDivision(){
    this.pushComp(Number(this.display), '÷')
    this.calcDisplay();


  /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
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

  doMultiply(){
    this.pushComp(Number(this.display), '×')
    this.calcDisplay();


    /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
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

  doSubtraction(){
    this.pushComp(Number(this.display), '-')
    this.calcDisplay();



    /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
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
 
  doAddition(){
    this.pushComp(Number(this.display), '+')
    this.calcDisplay();



    /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
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
    this.display = String(-Number(this.display));
  }

  doAddDecimal(){
    if(!this.display.includes('.')) this.display += '.';
  }

  doSolve(){
    if(this._awaitNew){
      this.pushComp(this._computation[this._computation.length-1][0], this._computation[this._computation.length-2][1], true);
      this.calcDisplay();
    } else {
      this.pushComp(Number(this.display),'')
      this.calcDisplay();
    }
    


    /* ====== Deprecated 6/19 | Will remove 6/20 ====== */  
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
    if(event.target.innerText !== 'CE') this._noLogClear = false;
    if(event.target.innerText.match(/^\d$/)) {
      if(this.display==='0' || this._resetFlag) {
        this.display= '';
        this._resetFlag=false;
        this._awaitNew=false;
      }
      // if(this._computation.lastOpen) {
      //   this._computation.lastOpen = false;
      //   this._computation.last = Number(event.target.innerText)      Deprecated 6/19
      // }                                                              Will remove 6/20
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
