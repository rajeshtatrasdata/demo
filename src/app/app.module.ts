import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, BaseRequestOptions } from '@angular/http';

import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { VeneerComponent } from './veneer/veneer.component';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService} from './_services/index';
import { VeneerService } from './veneer.service';
import {APP_CONFIG, AppConfig} from './app.config';
import { UserComponent } from './user/user.component';
import {CommonModule} from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    VeneerComponent,
    UserComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
     AuthGuard,
     AlertService,
     AuthenticationService,
     VeneerService,
    { provide: APP_CONFIG, useValue: AppConfig }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
