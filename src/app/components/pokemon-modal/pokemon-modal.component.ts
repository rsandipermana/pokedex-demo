import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import {
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-pokemon-modal',
  imports: [
    CommonModule,
    MatCardModule,
    MatCardContent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pokemon-modal.component.html',
  styleUrl: './pokemon-modal.component.scss',
  standalone: true,
})
export class PokemonModalComponent {
  readonly dialogRef = inject(MatDialogRef<PokemonModalComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pokemon) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
