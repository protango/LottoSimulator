import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';
import { TimetableComponent } from './timetable/timetable.component';
import { CurrencyComponent } from './currency/currency.component';
import { HomeComponent } from './home/home.component';
import { LottoComponent } from './lotto/lotto.component';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
		AppComponent,
		TimetableComponent,
		CurrencyComponent,
		LottoComponent,
		HomeComponent
	  ],
	  imports: [
		FormsModule,
		AppRoutingModule
	  ],
	  providers: [
		{provide: APP_BASE_HREF, useValue : '/' }
	  ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
