import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent {
  title = 'poke-api-angular';
  pokemons: Array<IPokemon> = [] ;
  pokemonsBase: Array<IPokemon> =[];
  filter: string = '';
  starFill : string = '&#11088;'
  star: string = '&#9733;'

  constructor(private pokemonService: PokemonService, private router:Router){}

  ngOnInit(): void {
      this.getPokemons()
      this.pokemonsBase = this.pokemons
  }

  pokeFilter(){
      if(this.filter === ''){
        this.pokemons = this.pokemonsBase
      }
        this.pokemons = this.pokemonsBase.filter((p: IPokemon) => p.name.includes(this.filter))
  }

  getPokemons(){
    this.pokemonService.getAll().subscribe(
      pokemons =>{
         const result = (Object(pokemons).results);
         result.map((p:IPokemon) => this.pokemonService.getByUrl(p.url)
         .subscribe(pokemon => this.pokemons.push(pokemon))) ;
      }
    );
  }
  favoritePokemon(pokemon: IPokemon):void{
    console.log(pokemon)
  }
  pokemonDetailsHandler(pokemon: IPokemon):void{
    this.router.navigate(['/pokemon', pokemon.name], {state:{pokemon}})
  }
}
