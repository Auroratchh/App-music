import { Component } from '@angular/core';
import { SearchBarComponent } from './shared/components/search-bar/search-bar';
import { AlbumCardComponent } from './features/album-card/album-card';
import { PlaylistComponent } from './features/playlist/playlist';
import { PlayerComponent } from './features/player/player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchBarComponent,
    AlbumCardComponent,
    PlaylistComponent,
    PlayerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'spotify-app';
}