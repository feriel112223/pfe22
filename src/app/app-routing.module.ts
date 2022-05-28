import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AdmincongesComponent } from './dashboards/adminconges/adminconges.component';
import { AdmineventComponent } from './dashboards/adminevent/adminevent.component';
import { CalendrierDeTravailComponent } from './dashboards/calendrier-de-travail/calendrier-de-travail.component';
import { DashComponent } from './dashboards/dash/dash.component';
import { DemandesComponent } from './dashboards/demandes/demandes.component';
import { EmloyeeComponent } from './dashboards/emloyee/emloyee.component';
import { FicheDePaiesComponent } from './dashboards/fiche-de-paies/fiche-de-paies.component';
import { HomeComponent } from './dashboards/home/home.component';
import { ListeCongesComponent } from './dashboards/liste-conges/liste-conges.component';
import { PresenceComponent } from './dashboards/presence/presence.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
 
  {path:"",redirectTo:'login',pathMatch:'full'},
 
  {path:'login',component:LoginComponent}, 
  {path:'home',component:HomeComponent,
  children:[
    {path:'demandes',component:DemandesComponent},
    {path:'employee',component:EmloyeeComponent},
    {path:'calendrier',component:CalendrierDeTravailComponent},
    {path:'conges',component:ListeCongesComponent},
    {path:'fiche_de_paies',component:FicheDePaiesComponent},
    {path:'listedemandes',component:AdmincongesComponent},
    {path:'liste_des_pv',component:AdmineventComponent},
    {path:'presence',component:PresenceComponent},
    {path:'dashboard',component:DashComponent},    
  ],
},
    
  
    
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
