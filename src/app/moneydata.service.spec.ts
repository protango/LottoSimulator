import { TestBed, inject } from '@angular/core/testing';

import { MoneydataService } from './moneydata.service';

import { HttpClientModule } from '@angular/common/http';

describe('MoneydataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
	  providers: [MoneydataService],
	  imports: [
		HttpClientModule
	  ],
    });
  });

  it('should be created', inject([MoneydataService], (service: MoneydataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the right symbol for USD', inject([MoneydataService], (service: MoneydataService) => {
    expect(service.getData("USD")["symbol"]).toEqual("$");
  }));

  it('can handle an invalid value', inject([MoneydataService], (service: MoneydataService) => {
	expect(service.getData("")["symbol"]).toEqual("");
	expect(service.getData(null)["symbol"]).toEqual("");
	expect(service.getData("ABCD")["symbol"]).toEqual("");
  }));

	it('returns valid currency data', inject([MoneydataService], (service: MoneydataService) => {
		let obs = service.getConfig();
		obs.subscribe(val => {
			expect(val["base"]).toEqual("EUR");
			Object.values(val["rates"]).forEach(element => {
				expect(element).toBeGreaterThan(0);
			});
		});
	}));

});
