import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TemplateFormComponent } from './template-form/template-form.component';
import { IncomeComponent } from './income/income.component';
import { TestingRxjsComponent } from './testing-rxjs/testing-rxjs.component';
import { GlobalHttpErrorHandlerInterceptor } from './interceptors/global-http-error-handler.interceptor';
import { TestingRxjsService } from './services/testing-rxjs.service';
import { FileInputDirective } from './directives/file-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SpinnerComponent,
    TemplateFormComponent,
    IncomeComponent,
    TestingRxjsComponent,
    FileInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: TestingRxjsService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
