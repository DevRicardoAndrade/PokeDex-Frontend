import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPokemon } from 'src/app/interfaces/IPokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent {
  @Input() pokemon: IPokemon = {
    name : '',
    url: ''
  };

  @Output() onClose: EventEmitter<any> = new EventEmitter()

  /**
   *
   */
}
