import { Injectable } from '@angular/core';
import { IUserLogin } from '../../interfaces/IUserLogin';
import { UserService } from '../user/user.service';
import { ResultsService } from '../results/results.service';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user : IUser | null = null;
  private authenticated: boolean = false;
  private authToken: string = '';

  constructor( private user: UserService, private results:ResultsService) { this.getStatus() }

  auth(user: IUserLogin): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      let errors: Array<string> = [];
      this.user.login(user)
        .subscribe(
          result => {
            if (result.token) {
              this.user.setTokenCookie(result.token);
              this.authenticated = true;
              this.authToken = result.token;
            }
          },
          error => {
            errors = this.results.getError(error);
          },
          () => {
            
            resolve(errors);
          }
        );
    });
  }
  
  isAuthenticated():boolean{
    return this.authenticated;
  }
  getAuthToken(): string {
    return this.authToken;
  }
  logout():void{
    this.authenticated = false;
    this.authToken = '';
    this.user.setTokenCookie('');
  }
  account(){
    this.user.me().subscribe(value => {
      this._user = value;
    })
    return this._user;
  }
  getStatus():void{
    const token = this.user.getCookies();
    if(token != null){
      this.authenticated = true;
      this.authToken = token
    }
  }
}
