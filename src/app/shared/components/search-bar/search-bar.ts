import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../../core/services/spotify';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent {

  searchQuery: string = '';

  constructor(private spotifyService: SpotifyService) { }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Buscando:', this.searchQuery);
      
      this.spotifyService.searchTracks(this.searchQuery).subscribe({
        next: (data) => {
          console.log('Resultados:', data);
        },
        error: (error) => {
          console.error('Error en la búsqueda:', error);
        }
      });
    }
  }
}