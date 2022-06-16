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
  public display:string = '';
  
  
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
    ['±', this.doSwitchSign],  ['0'],  ['.'], ['=', this.doSolve]
  ]
  
  // Check if button char is just a number
  isNumber(char:string){
    return char.match(/^[0-9]$/)
  }
  
  doPercent(){
   return 
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

  doSolve(){

  }


  test(event:object){
    console.log(event);
    
  }
}
