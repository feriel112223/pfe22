import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { EmloyeeComponent } from './dashboards/emloyee/emloyee.component';
import { DemandesComponent } from './dashboards/demandes/demandes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './dashboards/home/home.component';
import { CalendrierDeTravailComponent } from './dashboards/calendrier-de-travail/calendrier-de-travail.component';

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import { FicheDePaiesComponent } from './dashboards/fiche-de-paies/fiche-de-paies.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AngularDigitalClockModule } from 'angular-digital-clock';
import { ChartsModule } from 'ng2-charts';
import {NgxPrintModule} from 'ngx-print';
import { DashComponent } from './dashboards/dash/dash.component';
import { AdmincongesComponent } from './dashboards/adminconges/adminconges.component';
import { PresenceComponent } from './dashboards/presence/presence.component';
import { AdmindashComponent } from './dashboards/admindash/admindash.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ArchiveComponent } from './dashboards/archive/archive.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    EmloyeeComponent,
    DemandesComponent,
    HomeComponent,
    CalendrierDeTravailComponent,
    FicheDePaiesComponent,
    DashComponent,
    AdmincongesComponent,
    PresenceComponent,
    AdmindashComponent,
    ArchiveComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    FlatpickrModule.forRoot(),
    AngularDigitalClockModule,
    ChartsModule,
    NgxPrintModule,
    MatFormFieldModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
