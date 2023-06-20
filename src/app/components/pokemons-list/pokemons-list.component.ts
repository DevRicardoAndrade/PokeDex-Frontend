import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from 'src/app/interfaces/IPokemon';
import { IPokemonFavorited } from 'src/app/interfaces/IPokemonFavorited';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent {
  title = 'poke-api-angular';
  loading: boolean = false;
  pokemons: Array<IPokemon> = [] ;
  pokemonsBase: Array<IPokemon> =[];
  filter: string = '';
  numberOfPokemons: number = 20;
  starFill : string = '&#11088;'
  star: string = '&#9733;'
  favoritedPokemons: IPokemonFavorited[] = []

  constructor(private pokemonService: PokemonService, private router:Router){}

  ngOnInit(): void {
      this.loading = true;
      this.getPokemons();
      this.pokemonsBase = this.pokemons;
      this.getFavoritesPokemons();
  }

  pokeFilter(){
    this.loading = true;
    const pokeFilter = this.pokemonsBase;
      if(this.filter === ''){
        this.pokemons = this.pokemonsBase
      }
        this.pokemons = pokeFilter.filter((p: IPokemon) => p.name.includes(this.filter))
        this.loading = false;
  }

  getPokemons(){
    this.pokemons = []
    this.pokemonService.getAll(this.numberOfPokemons).subscribe(
      pokemons =>{
         const result = (Object(pokemons).results);
         result.map((p:IPokemon) => 
         {
          this.loading = true;
          this.pokemonService.getByUrl(p.url).subscribe(pokemon =>{
            pokemon.url = p.url
            this.loading = true;
            this.pokemons.push(pokemon)
            },
            error => {
              this.loading = false;
            },
            () =>{
              this.loading = false;
            }
          )
         }
         
      );
      }
    );
      
  }
  favoritePokemon(pokemon: IPokemon):void{
    if(this.favoritedPokemons.filter(p => p.idPokemon === pokemon.id ).length > 0){
      this.pokemonService.unfavorite(pokemon).subscribe(p =>{
        const pokeFav = this.favoritedPokemons.findIndex(pf => pf.idPokemon == pokemon.id)
        this.favoritedPokemons.splice(pokeFav, 1);
      })
      
    }

    else{
      this.pokemonService.favorite(pokemon).subscribe(p => {
        this.favoritedPokemons.push(p);
      })
    }
  
  }
  pokemonDetailsHandler(pokemon: IPokemon):void{
    this.router.navigate(['/pokemon', pokemon.name], {state:{pokemon}})
  }
  getFavoritesPokemons():void{
    this.pokemonService.getFavorites().subscribe(ap =>{
      this.favoritedPokemons = ap
    })
  }
  handlePokemon(pokemon: IPokemon){
    return this.favoritedPokemons.filter(p => p.idPokemon === pokemon.id ).length > 0  ? this.starFill : this.star;
  }
  handleblur(){
    this.loading = true;
    this.getPokemons();
    this.pokemonsBase = this.pokemons;
    this.getFavoritesPokemons();
  }
}
