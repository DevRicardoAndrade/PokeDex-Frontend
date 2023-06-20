import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserLogin } from '../../interfaces/IUserLogin';
import { Observable } from 'rxjs';
import { IToken } from '../../interfaces/IToken';
import { IUser } from '../../interfaces/IUser';
import { ResultsService } from '../results/results.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url_base: string = 'https://localhost:7021/api/user';
  constructor(private htpp : HttpClient, private results:ResultsService) { }

  login(user:IUserLogin):Observable<IToken>{
      return this.htpp.post<IToken>(this.url_base + '/login', user);
  }
  me():Observable<IUser>{
    const token = document.cookie.split('=');
    
    return this.htpp.get<IUser>(this.url_base + '/me',{
      headers: new HttpHeaders().append(token[0], token[1])
    });
  }
  setTokenCookie(token:string):boolean{
    document.cookie = 'Authorization=' + token
    localStorage.setItem('Authorization=', token)
    sessionStorage.setItem('Authorization=', token)
    if(!document.cookie.includes('Authorization=')){
      return false;
    }
    return true;
  }
  getCookies():string | null{
    const cookie = document.cookie.split('=')
    if(cookie[0] === 'Authorization' && cookie[1]){
      return cookie[1]
    }
    else
      return null;
  }
  register(user: IUser): Promise<string[]> {
    user.rules = [{name: 'USER'}];
    return new Promise<string[]>((resolve, reject) => {
      let errors: Array<string> = [];
      this.htpp.post(this.url_base + '/register', user).subscribe(
          result => {
            resolve([]);
          },
          error => {
            errors = this.results.getError(error);
            reject(errors)
          }
        );
    });
  }
}
