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
    this.context = this._contextService;
  }

  public display:string = '0';        // Displayed to the calculator
  private _computation:any[][] = [[0,'']] // Used to compute final display
  private _testLog:any[][] = []
  private _resetFlag:boolean = false;         // Determines if display should be reset to new number on input
  private _awaitNew:boolean = false;          // Determines if awaiting a new operation button press or recalc prev on equals button
  private _resolve:boolean = false;
  private _clearToLog:boolean = false;        // Determines if clearing will log to history
  private _noLogClear:boolean =false;         // Determines if clearing without logging to history
  private _opGroup:string[] = ['+','-','×','÷'];

  pushComp(num:number, op:string, notLast:boolean=false){
    if(notLast){
      this._computation.splice(this._computation.length-1,0,[num,op])
    } else {
      this._computation.push([num, op])
    }
  }

  reduceCalc(compArr:any[][]):number{
    return compArr.reduce((prev, [curr], cIn) => {
      switch (compArr[cIn-1] ? compArr[cIn-1][1]:0) {
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
  }

  reduceComp(){
    let tmp = [...this._computation].slice(0,-1);
    return [[this.reduceCalc(tmp),tmp.slice(-1)[0][1]],this._computation.slice(-1)[0]];
  }

  scrubInst(inst:any[][]):any[][]{
    let firstIsOp:boolean = false;
    let hasOps:boolean[] = [false,false];
    let hasNoStart:(boolean | number)[] = [false,0];
    for(let i = 0; i<inst.length; i++) {
      if(i===0 && inst[i][1]!=='') firstIsOp = true;
      if(inst[i][1]==='') {
        hasOps[0] = true;
        hasNoStart[0] = !hasNoStart
        if(hasNoStart[0]) hasNoStart[1]=i;
      } else {
        if(hasOps[0]) hasOps[1] = true;
      }
    }
    console.log(firstIsOp, hasOps, hasNoStart);
    
    return inst
    // let tmp:any[][] = [...inst]
    // if(firstIsOp) tmp = tmp.slice(1);
    // if(!hasOps[0] || !hasOps[1]) tmp = tmp.slice(1);
    // if(hasNoStart)
  }

  sendToLog(){
    this._testLog.push(this.scrubInst(this._computation))
    this._computation = this.reduceComp();
  }

  calcDisplay(logHist:boolean=false):number{
    if(logHist) this.sendToLog();
    this.display = String(this.reduceCalc(this._computation));
    this._resetFlag = true;
    this._awaitNew = true;
    return Number(this.display);
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
  }

  doClearEntry(){
    if(this._noLogClear){
      console.log('tested');
      
      this.display = '0';
      this._computation = [[0,'']]
    } else {
      this.display = '0';
      this._noLogClear = true;
    }
  }

  doClear(){
    this.display = '0';
    this._computation = [[0,'']]
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
  }

  doMultiply(){
    this.pushComp(Number(this.display), '×')
    this.calcDisplay();
  }

  doSubtraction(){
    this.pushComp(Number(this.display), '-')
    this.calcDisplay();
  }
 
  doAddition(){
    this.pushComp(Number(this.display), '+')
    this.calcDisplay();
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
      this.reduceComp()
      this.calcDisplay(true);
    } else {
      this.pushComp(Number(this.display),'')
      this.calcDisplay(true);
    }
    console.log(this._computation, this._testLog);
    
  }


  numPress(event:any){
    if(event.target.innerText === '=' && !this._resolve){
      this._resolve = true
    } else if (event.target.innerText === '=' && this._resolve){
      this.doSolve.call(this);
      return
    }
    
    if(event.target.innerText !== 'CE') {
      this._noLogClear = false
    } else {
      if(this._noLogClear){
        this.doClearEntry()
      }
    }

    if(!this._opGroup.includes(event.target.innerText)) this._awaitNew=false;
    if(event.target.innerText.match(/^\d$/)) {
      if(this.display==='0' || this._resetFlag) {
        this.display= '';
        this._resetFlag=false;
      }
      this.display += event.target.innerText
    } else {
      for(let [char, op] of this.buttons){
        if(char === event.target.innerText){
          op.call(this)
        }
      }
    }
    console.log(this._computation)
  }
}
