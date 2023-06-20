import { Component } from '@angular/core';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { IUser } from 'src/app/interfaces/IUser';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  pokemonsFavoriteds: Array<IPokemon> = []
  me: IUser = {userName: '',
              name : '',
              email: '',
              password: ''
              }

  /**
   *
   */
  constructor(private user: UserService, private pokemon: PokemonService) {
    this.user.me().subscribe(e =>{
      this.me = e
      if(this.me.pokemonFavorited){
        this.me.pokemonFavorited.map(p =>{
          this.pokemon.getByUrl(p.url)
          .subscribe(pd =>{
            this.pokemonsFavoriteds.push(pd);
          });
        });
      }
      
    })

  
  }
}
