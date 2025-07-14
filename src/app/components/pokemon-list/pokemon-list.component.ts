import { Component, computed, effect, inject, signal } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonModalComponent } from '../pokemon-modal/pokemon-modal.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    MatDialogModule,
    CommonModule,
    PokemonCardComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  standalone: true,
})
export class PokemonListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly service = inject(PokemonService);

  itemsPerPage = 10;
  totalPokemons = 151;
  maxPage = Math.ceil(this.totalPokemons / this.itemsPerPage);
  pokemons = signal<Pokemon[]>([]);
  loading = signal(true);
  displayedPokemons = computed(() => this.pokemons());
  currentPage = signal(1);
  pages = signal<number[]>([]);

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  fetchData(): void {
    this.loading.set(true);
    const offset = (this.currentPage() - 1) * this.itemsPerPage;
    const limit = Math.min(this.itemsPerPage, this.totalPokemons - offset);

    this.service.getAllPokemon(offset, limit).subscribe((data: any) => {
      this.pokemons.set(data);
      this.generatePages();
      this.loading.set(false);
    });
  }

  updateDisplayedPokemons(): void {
    this.displayedPokemons = this.pokemons;
  }

  nextPage(): void {
    if (this.currentPage() < this.maxPage) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
  }

  generatePages(): void {
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage() - Math.floor(maxVisiblePages / 2)
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.maxPage) {
      endPage = this.maxPage;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    this.pages.set(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  }

  openModal(pokemon: Pokemon): void {
    this.dialog.open(PokemonModalComponent, { data: pokemon });
  }
}
