import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quotes-card',
  templateUrl: './quotes-card.component.html',
  styleUrls: ['./quotes-card.component.scss'],
})
export class QuotesCardComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

  @Input() quote: string = '';
  @Input() author: string = '';
  @Input() errorMessage: string = '';
}
