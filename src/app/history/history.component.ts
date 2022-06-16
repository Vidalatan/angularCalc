import { Component, OnInit } from '@angular/core';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public context = {}

  constructor(private _contextService: ContextService) { }

  ngOnInit(): void {
    this.context = this._contextService
  }

}
