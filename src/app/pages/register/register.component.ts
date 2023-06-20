import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  processing: boolean = false;
  errors: Array<string > = []

  constructor(private user: UserService, private router:Router) {
    
  }

  submitHandler(e:NgForm):void{
    this.processing = true;
    this.user.register(e.form.value)
      .then(e => this.errors = e)
      .catch(e => this.errors = e)
      .finally(() =>{
        this.processing = false
        if(this.errors.length <=0 ){
          this.router.navigate(['login'])
        }
        
      })
  }
}
