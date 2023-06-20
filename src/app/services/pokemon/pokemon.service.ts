import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { AuthService } from '../auth/auth.service';
import { IPokemonFavorited } from 'src/app/interfaces/IPokemonFavorited';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_base: string = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(num:number): Observable<Array<IPokemon>>{
    return this.http.get<Array<IPokemon>>(this.url_base + 'pokemon?limit=' + (num).toString() + '&offset=0');
  }
  getByUrl(url:string):Observable<IPokemon>{
    return this.http.get<IPokemon>(url)
  }
  favorite(pokemon: IPokemon):Observable<IPokemonFavorited>{
    return this.http.post<IPokemonFavorited>('https://localhost:7021/api/pokemon/favorite', {
      idPokemon: pokemon.id,
      name: pokemon.name,
      url: pokemon.url
    },{
      headers: new HttpHeaders().set('Authorization', this.auth.getAuthToken())
    })
  }
  getFavorites():Observable<IPokemonFavorited[]>{
    return this.http.get<IPokemonFavorited[]>('https://localhost:7021/api/pokemon/favorite', {
      headers: new HttpHeaders().set('Authorization', this.auth.getAuthToken())
    })
    
  }
  unfavorite(pokemon: IPokemon):Observable<IPokemonFavorited>{
    return this.http.post<IPokemonFavorited>('https://localhost:7021/api/pokemon/unfavorite', {
      idPokemon: pokemon.id,
      name: pokemon.name,
      url: pokemon.url
    },{
      headers: new HttpHeaders().set('Authorization', this.auth.getAuthToken())
    })
  }
}
