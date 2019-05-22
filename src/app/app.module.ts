import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TimetableComponent } from './timetable/timetable.component';
import { CurrencyComponent } from './currency/currency.component';
import { HomeComponent } from './home/home.component';
import { MoneydataService } from './moneydata.service';
import { LottoComponent } from './lotto/lotto.component';

import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    CurrencyComponent,
	HomeComponent,
	LottoComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	OAuthModule.forRoot()
  ],
  providers: [
	MoneydataService
  ],
  bootstrap: [LottoComponent]
})
export class AppModule {

}
