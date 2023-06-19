import { Component } from '@angular/core';
import { IPokemon } from 'src/app/interfaces/IPokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  pokemon: IPokemon = history.state.pokemon;
  constructor() { console.log(history.state.pokemon) }
}
