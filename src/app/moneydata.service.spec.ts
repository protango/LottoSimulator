import { TestBed, inject } from '@angular/core/testing';

import { MoneydataService } from './moneydata.service';

describe('MoneydataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoneydataService]
    });
  });

  it('should be created', inject([MoneydataService], (service: MoneydataService) => {
    expect(service).toBeTruthy();
  }));
});
