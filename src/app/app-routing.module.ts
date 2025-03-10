import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { IncomeComponent } from './income/income.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TestingRxjsComponent } from './testing-rxjs/testing-rxjs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'temp', component: TemplateFormComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'testingRxjs', component: TestingRxjsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
