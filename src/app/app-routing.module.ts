import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { CurrencyComponent } from './currency/currency.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'currency', component: CurrencyComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 

}
