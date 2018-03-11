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
		for (let i=0; i<prizepools.length; i++) 
			divResults.push({division: i+1, prizePool: prizepools[i], winners: winners[i], divPrize: (winners[i]==0?0:prizepools[i]/winners[i])});
		
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
			do {
				let test = this.binomial(divChance,numOfPeople,tryWinners);
				oddsGreater -= test; //<-- this is the chance of EXACTLY %tryWinners% people winning 
				tryWinners++;
			} while (Math.random()<oddsGreater); // test if winners>=trywinners
			winners[i] = tryWinners-1; // we take off the last person since their the one that failed the win test
			numOfPeople-= winners[i]; // take the winners out of the pool since you can't win twice
		}
		return winners;
		/*
		//we're going to take special effort to calculate how many people win the div one, two and three prizes (since it's so unlikely)
		let div1Winners = 0, div2Winners=0, div3Winners=0, div1Chance=76767600, div2Chance=4040400, div3Chance=376312, batches=Math.ceil(numOfPeople/3E5);
		for (let i = 0; i < batches; i++) {
			//looping through each fake person, in batches of 300K
			let batchCount = i==batches-1?numOfPeople-(batches-1)*3E5:3E5 //accounting for last batch
			//does this batch contain a winner?
			let d1winner = Math.random() < 1-Math.pow((div1Chance-1)/div1Chance,batchCount);
			let d2winner = Math.random() < 1-Math.pow((div2Chance-1)/div2Chance,batchCount);
			let d3winner = Math.random() < 1-Math.pow((div3Chance-1)/div3Chance,batchCount);
			if (d1winner) div1Winners++;
			if (d2winner) div2Winners++;
			if (d3winner) div3Winners++;
		}
		if (div1Winners>0) this.jackpot =0;
		return [
			div1Winners, //div 1 odds (special case see above)
			div2Winners, //div 2 odds
			div3Winners, //div 3 odds
			Math.floor(numOfPeople/19806), //div 4 odds
			Math.floor(numOfPeople/9123), //div 5 odds
			Math.floor(numOfPeople/641), //div 6 odds
			Math.floor(numOfPeople/480), //div 7 odds
			Math.floor(numOfPeople/110) //div 8 odds
		];*/
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
	binomial(chance,trials, target) : number {
		//calculate ncr
		let combinations=1;
		for (let i=0; i<target; i++)
			combinations*=(trials-i)/(i+1);
		let out = combinations*Math.pow(chance,target)*Math.pow((1-chance),(trials-target));
		if (Number.isNaN(out))
			out = NaN;
		return out;
	}
}

