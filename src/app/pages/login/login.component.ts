import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: Array<string> = [];

  processing: boolean = false;

  constructor(private auth: AuthService, private router:Router) {}

  ngOnInit(){
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/'])
    }
  }
  
  submitHandler(e:NgForm):void{
    this.processing = true;
    this.auth.auth(e.form.value)
    .then((value) =>{
      this.errors = value
      if(this.auth.isAuthenticated()){
        this.router.navigate(['/'])
      }
    })
    .finally(() =>{
      this.processing = false;

    })
  }
}
