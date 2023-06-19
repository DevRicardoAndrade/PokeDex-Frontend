import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url_base: string = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<IPokemon>>{
    return this.http.get<Array<IPokemon>>(this.url_base + 'pokemon?limit=100000&offset=0');
  }
  getByUrl(url:string):Observable<IPokemon>{
    return this.http.get<IPokemon>(url)
  }
}
