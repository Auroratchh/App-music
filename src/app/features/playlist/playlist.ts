import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../core/models/track';
import { PlayerService } from '../../core/services/player';
import { SpotifyService } from '../../core/services/spotify';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class PlaylistComponent implements OnInit {

  tracks: Track[] = [];

  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.spotifyService.searchResults$.subscribe(tracks => {
      this.tracks = tracks;
      console.log('Canciones en playlist:', tracks.length);
    });
  }

  onSelectTrack(track: Track): void {
    console.log('Reproduciendo:', track.name);
    this.playerService.playTrack(track);
  }
}