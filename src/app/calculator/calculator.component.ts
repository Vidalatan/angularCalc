import { Component, OnInit } from '@angular/core';
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
  
  
  // Each button symbol or number
  public buttons: any[][] = 
  [
    ['%', this.doPercent], ['CE', this.doClearEntry],
    [ 'C', this.doClear], ['«', this.doBackSpace],
    ['1/x', this.doInverse], ['x^2', this.doSquare],   
    ['√a', this.doSqrt], ['÷', this.doDivision],
    ['7'],  ['8'],  ['9'], ['×', this.doMultiply],
    ['4'],  ['5'],  ['6'], ['-', this.doSubtraction],
    ['1'],  ['2'],  ['3'], ['+', this.doAddition],
    ['±', this.doSwitchSign],  ['0'],  ['.',this.doAddDecimal], ['=', this.doSolve]
  ]
  
  doPercent(){
   console.log('tested');
   
  }

  doClearEntry(){

  }

  doClear(){

  }

  doBackSpace(){

  }

  doInverse(){

  }

  doSquare(){

  }

  doSqrt(){

  }

  doDivision(){

  }

  doMultiply(){

  }

  doSubtraction(){

  }

  doAddition(){

  }

  doSwitchSign(){

  }

  doAddDecimal(){

  }

  doSolve(){

  }


  numPress(event:any){
    
    if(event.target.innerText.match(/^\d$/)) {
      (this.display==='0' && (this.display= ''))
      this.display += event.target.innerText
    } else {
      for(let btn of this.buttons){
        if(btn[0] === event.target.innerText){
          btn[1]()
        }
      }
    }
  }
}
