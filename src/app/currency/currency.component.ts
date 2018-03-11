import { Component, OnInit } from '@angular/core';
import { MoneydataService } from '../moneydata.service';
import { Observable } from 'rxjs/Observable';
import { delay, share } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
	udt : String; curdata : Observable<object>;
	amnt; cur; tocur;
	constructor(private ms : MoneydataService) { }
	
	ngOnInit() {
		this.rates();
		this.cur=""; this.tocur="";
	}
	objectKeys = Object.keys;
	rates() : void {
		this.udt = new Date().toLocaleString();
		this.curdata = this.ms.getConfig().pipe(share());
	}
	formatMoney(n, c, d, t) : string {
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t;
		var s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : "");
	};
	calcur(fcur, tcur, amount) {
		return (tcur / fcur * amount);
	};

}
