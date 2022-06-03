import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { LoginComponent } from './Auth/login/login.component';
import { AdmincongesComponent } from './dashboards/adminconges/adminconges.component';
import { AdmindashComponent } from './dashboards/admindash/admindash.component';
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
canActivate:[AdminGuard]
const routes: Routes = [
 
   {path:"",redirectTo:'login',pathMatch:'full'},
 
  {path:'login',component:LoginComponent}, 
  {path:'home',component:HomeComponent,
   children:[
    {path:'demandes',component:DemandesComponent},
    {path:'employee',component:EmloyeeComponent},//canActivate:[AdminGuard]},
    {path:'calendrier',component:CalendrierDeTravailComponent},
    {path:'conges',component:ListeCongesComponent},
    {path:'fiche_de_paies',component:FicheDePaiesComponent},
    {path:'listedemandes',component:AdmincongesComponent},
    
    {path:'presence',component:PresenceComponent},
    {path:'dashboard',component:DashComponent}, 
    {path:'admindash',component:AdmindashComponent}   
   ]}]
 
    
  
    
  
  
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
