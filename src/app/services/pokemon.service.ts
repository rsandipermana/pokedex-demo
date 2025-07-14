import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly http: HttpClient) {}

  getAllPokemon(offset: number, limit: number): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `${this.baseUrl}?offset=${offset}&limit=${limit}`
      )
      .pipe(
        switchMap((response: any): Observable<Pokemon[]> => {
          const requests = response.results.map((pokemon: any) =>
            this.http.get<Pokemon>(pokemon.url)
          );
          return forkJoin(requests) as Observable<Pokemon[]>;
        })
      );
  }
}
