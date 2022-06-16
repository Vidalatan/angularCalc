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
  public buttons:string[] = 
  [
    '%',  'CE', 'C', '«',
    '1/x','x^2','√a','÷',
    '7',  '8',  '9', '×',
    '4',  '5',  '6', '-',
    '1',  '2',  '3', '+',
    '±',  '0',  '.', '='
  ]

  // Check if button char is just a number
  isNumber(char:string){
    return char.match(/^[0-9]$/)
  }

}
