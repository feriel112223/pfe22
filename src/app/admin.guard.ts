// import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
// import { AdminService } from './services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  verif:any
  id= JSON.parse(localStorage.getItem("user")||'').id;
    role= JSON.parse(localStorage.getItem("user")||'').role;
  constructor(private router :Router,private authServ:AuthService)
  {
    
  }
 
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (    this.id && this.role=="ADMIN"
      )
      return true;
      else
      {
        // this.router.navigate(['/admin/login']);
      return false;
      }
      
  }
  
}
