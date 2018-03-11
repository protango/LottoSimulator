import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { CurrencyComponent } from './currency/currency.component';
import { HomeComponent } from './home/home.component';
import { LottoComponent } from './lotto/lotto.component';

const routes: Routes = [
  { path: 'currency', component: CurrencyComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'lotto', component: LottoComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 

}
