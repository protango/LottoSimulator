import { Component, OnInit } from '@angular/core';
import { MoneydataService } from '../moneydata.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  constructor(private ms : MoneydataService) { }

  ngOnInit() {
  }

}
