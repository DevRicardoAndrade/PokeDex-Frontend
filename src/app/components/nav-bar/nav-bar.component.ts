import { Component, OnInit } from '@angular/core';
import { IRoutes } from '../../interfaces/IRoutes';
import { getRoutes } from '../../router/app-routing.module';
import { AuthService } from '../../services/auth/auth.service';
import {  NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  title ='Poke Api Angular'

  constructor(private auth: AuthService, private router: Router ) {}

  routes: Array<IRoutes> = []
  _auth:AuthService = this.auth;
  _route:string | null = ''
  ngOnInit(): void {

      getRoutes().map(value =>{
        if(value.path !== 'login' && value.path !== 'me' && value.path !==  'pokemon/:name' ){
          this.routes.push({
            path : value.path,
            label : value.component?.name.replace('Component', '')
          });
        }
      })

      this.router.events.subscribe((event) =>{
        if(event instanceof NavigationEnd){
          this._route = event.url;
        }
      })
  }
  logoutHandler():void{
    this._auth.logout();
  }

}

