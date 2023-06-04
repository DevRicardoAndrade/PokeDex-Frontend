import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'poke-api-angular';
  pokemons: any = [] 
  pokemonsFilter: any =[]
  pokemonsDetail: any = []
  showDetailPokemon: boolean = false
  selectedPokemon: any ={}

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
      this.getPokemons()
  }

  pokeFilter(){

  }

  mostrarDetalhes(pokemon:any){
    this.selectedPokemon = pokemon
    this.showDetailPokemon = !this.showDetailPokemon
  }

  getPokemons(){
    this.pokemonService.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').subscribe(pokemons =>{
      this.pokemons = pokemons
      this.getPokemonDetails()
    })
  }

  getPokemonDetails(){
    this.pokemons.results.map((e:any) => {
      this.pokemonService.get(e.url).subscribe(pokemon =>{
        this.pokemonsDetail.push(pokemon)
      })
    })
  }
  onClose(){
    this.showDetailPokemon = !this.showDetailPokemon
    this.selectedPokemon = {}
  }
}
