import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyComponent } from './currency.component';
import { MoneydataService } from '../moneydata.service';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ CurrencyComponent ],
	  imports: [
		FormsModule,
		HttpClientModule
	  ],
	  providers: [
		MoneydataService
	  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component.formatMoney(1234.559,2,undefined,undefined)).toEqual("1,234.56");
  });

});
