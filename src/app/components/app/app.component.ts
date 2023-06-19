import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title ='Poke Api Angular'

  _route: string  = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationEnd){
        this._route = event.url;
      }
    })
  }
}
