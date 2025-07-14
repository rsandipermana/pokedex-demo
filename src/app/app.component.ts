import { Component } from '@angular/core';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokedex-demo';
}
