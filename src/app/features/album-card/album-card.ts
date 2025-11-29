import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-card.html',
  styleUrl: './album-card.css'
})
export class AlbumCardComponent implements OnInit {

  albums: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadNewReleases();
    }, 1000);

    this.spotifyService.albums$.subscribe(albums => {
      if (albums.length > 0) {
        this.albums = albums;
      }
    });
  }

  loadNewReleases(): void {
    this.spotifyService.getNewReleases().subscribe({
      next: (albums) => {
        this.albums = albums;
        console.log('Álbumes cargados:', albums.length);
      },
      error: (error) => {
        console.error('Error cargando álbumes:', error);
      }
    });
  }
}