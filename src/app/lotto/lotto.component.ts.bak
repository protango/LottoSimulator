import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-lotto',
	templateUrl: './lotto.component.html',
	styleUrls: ['./lotto.component.css']
})
export class LottoComponent implements OnInit {
	divResults : Object[]; totalWinnings = 0;
	mark = false; goResults : number[]; gowinners : number[][];
	money=10000.00; results : number[];
	generated : string = ""; barcode : string = "";
	game = 0; jackpot = 100; 
	serial : string = "";
	type : string;
	objectKeys = Object.keys;
	ticket :number[][];
	gameTypes : Object = {
		"Stamp": {
			"Games": 1,
			"Price": 0.93,
			"Entry": "Standard",
			"Code": "QP01G 0093 S"
		},
		"Regular": {
			"Games": 12,
			"Price": 11.15,
			"Entry": "Standard",
			"Code": "QP12G 1115 S"
		},
		"Super": {
			"Games": 18,
			"Price": 16.7,
			"Entry": "Standard",
			"Code": "QP18G 1670 S"
		},
		"Mega": {
			"Games": 24,
			"Price": 22.3,
			"Entry": "Standard",
			"Code": "QP24G 2230 S"
		},
		"Jumbo": {
			"Games": 36,
			"Price": 33.45,
			"Entry": "Standard",
			"Code": "QP36G 3345 S"
		},
		"Maxi": {
			"Games": 50,
			"Price": 46.45,
			"Entry": "Standard",
			"Code": "QP50G 4645 S"
		},
		"\u00DCber": {
			"Games": 1000,
			"Price": 929,
			"Entry": "Standard",
			"Code": "QP1E4 929000 S"
		},
		"Syndicate 100k": {
			"Games": 100000,
			"Price": 92900,
			"Entry": "Syndicate",
			"Code": "QP1E5 929E2 SYN"
		},
		"Syndicate 10M": {
			"Games": 10000000,
			"Price": 9290000,
			"Entry": "Syndicate",
			"Code": "QP1E7 929E4 SYN"
		},
		"Luck o' the Irish": {
			"Games": 100000000,
			"Price": 92900000,
			"Entry": "Syndicate",
			"Code": "QP1E8 929E5 SYN"
		},
		"Fools Gold": {
			"Games": 1000000000,
			"Price": 929000000,
			"Entry": "Syndicate",
			"Code": "QP1E9 929E6 SYN"
		}
	};
	constructor() { }

	ngOnInit() {
	}
	
	roll(min,max,numbers) : number[] {
		let out : number[] = [];
		for(let cube=0;cube<numbers; cube++) {
			let draw;
			do {
				draw = Math.floor(Math.random() * (max+1-min)) + min;
			}
			while (out.indexOf(draw) != -1); 
			out.push(draw);
		}
		return out;
	}
	genGame(min, max, numbers, sups, smin, smax) : number[] {
		smin = smin==null ? min:smin;
		smax = smax==null ? max:smax;
		let out : number[] = this.roll(min,max,6);
		this.roll(smin,smax,1).forEach(element => {
			out.push(element);
		});
		return out;
	}

	quickPick(type : string) : void {
		this['claimed'] = false; this['dismissed'] = false;
		this.mark = false;
		this.game++;
		this.money -= this.gameTypes[type]["Price"];
		var games = this.gameTypes[type]["Games"]; this['games'] = games;
		let ticket = [];
		if (this.gameTypes[type]["Entry"]=="Standard") {
			for(let g = 0;g<games;g++) {
				ticket[g] = this.genGame(1,40,6,1,1,20);
				ticket[g].splice(0, 0, g+1);
			}
		}
		this.ticket = ticket;
		this.results = this.genGame(1,40,6,1,1,20);
		//this.results = [20,16,4,32,19,31,16];
		this.generated = new Date().toLocaleString();
		this.serial = this.randString(3)+this.randString(5,"numeric")+"-"+this.randString(10,"numeric")+"-"+this.randString(3,"numeric");
		this.barcode = this.randString(15,"numeric");
		this.jackpot += 3;
		this.type = type;
		this.checkGame();
	}
	checkGame() : void {
		let goResults = [],gowinners = [], entry = this.gameTypes[this.type]["Entry"], games=this.gameTypes[this.type]["Games"];
		if (entry=="Standard") { // standard game check
			for(let i = 0; i < games; i++) {
				let mains = 0, sups = 0;
				for (let z = 0; z<this.results.length; z++) {
					let index = this.results.indexOf(this.ticket[i][z+1]);
					if (index!=-1&&index!=6&&z!=6) mains++;
					if (z==6&&this.results[6]==this.ticket[i][7]) sups++;
				}
				let warr = (sups==1)?{6:1, 5:3, 4:5, 3:6, 2:8}:{6:2, 5:4, 4:7};
				let div = (warr[mains]==null)?0:warr[mains];
				goResults.push(div);
				if (div>0) gowinners.push([i,div]);
			}
		} else if (entry=="Syndicate") { // syndicate game check
			let winners = this.genFakeWinners(games), usedGames=[];
			for (let z=0; z<winners.length; z++) 
				gowinners.push([winners[z]-1,z+1]);
		}
		this.gowinners = gowinners;
		this.goResults = goResults;

		/*
		   NOW to calculate the results for all the fake people
		*/
		//estimate how many people will play based on jackpot value (with +-2% randomness)
		let fakepeople = Math.round((this.jackpot*1E6*1.1989+1E7) * (Math.floor(Math.random() * (10200 - 9800))+9800)/10000);
		let people = fakepeople + this.gameTypes[this.type]["Games"]; // add the games we played into the total number of games
		this['people'] = people; // export people to the scope
		if (this.jackpot < 3) this.jackpot=3; // fix the 0 jackpot bug
		let prizepools = [this.jackpot*1E6, people*0.0153, people*0.0161, people*0.0089, people*0.0068,people*0.0595, people*0.0534, people*0.1222];
		let winners = this.genFakeWinners(fakepeople); // winners for fake people
		
		if (entry=="Standard")
			gowinners.forEach(element => {winners[element[1]-1]++;});
		 else if (entry=="Syndicate")
			gowinners.forEach(element => {winners[element[1]-1]+=element[0]+1;});
		
		if (winners[0]>0) this.jackpot = 0; // reset the jackpot if anyone won
		let divResults = []; // build up object of division results for display (none of this data is new)
		let totalPrizePool = 0, winPrizePool=0;
		for (let i=0; i<prizepools.length; i++) {
			divResults.push({division: i+1, prizePool: prizepools[i], winners: winners[i], divPrize: (winners[i]==0?0:prizepools[i]/winners[i])});
			totalPrizePool += prizepools[i];
			winPrizePool += (winners[i]==0?0:prizepools[i]);
		}
		this["totalPrizePool"] = totalPrizePool;
		this["winPrizePool"] = winPrizePool;
		
		let total=0;
		if (entry=="Standard") 
			gowinners.forEach(element => {total+=divResults[element[1]-1]['divPrize'];}); 
		else if (entry=="Syndicate")
			gowinners.forEach(element => {total+=divResults[element[1]-1]['divPrize']*(element[0]+1);}); 
		
		this.divResults = divResults; // export more variables to scope
		this.totalWinnings = total;
	}
	genFakeWinners(numOfPeople) : number[] {
		let odds=[76767600,4040400,376312,19806,9123,641,480,110];
		let winners=[];
		for (let i=0; i<odds.length; i++) {
			winners.push(0);
			let divChance = 1/odds[i]; // chance of an isolated person winning this div
			let tryWinners = 0;  // number of people we're presuming to have won (increases each iteration)
			let oddsGreater = 1; // chance that winners>=tryWinners
			let nCr = 1; let scale=1;
			do {
				if (tryWinners>0) 
					nCr = nCr * (numOfPeople-(tryWinners-1))/((tryWinners-1)+1);
				if (nCr==Infinity) {
					tryWinners = Math.floor(numOfPeople/odds[i])+1; //if an overflow occurs, fallback to dumb method
					const variation = 50;
					tryWinners *= 1+(this.gaussianRand()*variation/100-variation/200); // vary the value by +-variation/2% (normally distributed)
					tryWinners = Math.floor(tryWinners);
					break;
				}
				let test = nCr*Math.pow(divChance,tryWinners)*Math.pow((1-divChance),(numOfPeople-tryWinners));
				oddsGreater -= nCr*Math.pow(divChance,tryWinners)*Math.pow((1-divChance),(numOfPeople-tryWinners));
				tryWinners++;
			} while (Math.random()<oddsGreater); // test if winners>=trywinners
			winners[i] = tryWinners-1; // we take off the last person since their the one that failed the win test
			numOfPeople-= winners[i]; // take the winners out of the pool since you can't win twice
		}
		return winners;
	}

	claim() :void {
		this.money +=this.totalWinnings;
		this['claimed'] = true;
	}

	randString(length, mode="") : string {
		let min=65, max=91;
		if (mode=="alpha") {
			min = 97; max = 123;
		} else if (mode=="numeric") {
			min = 48; max = 58;
		}
		let out = "";
		for (let i=0; i<length; i++) {
			out += String.fromCharCode(Math.floor(Math.random() * (max - min)) + min);
		}
		return out;
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
	gaussianRand() {
		let rand = 0;
		for (var i = 0; i < 100; i += 1) {
		  rand += Math.random();
		}
		return rand / 100;
	  }
}

