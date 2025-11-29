import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private apiUrl = 'https://api.spotify.com/v1';
  private clientId = 'c16dd55bbe2c4bc1847b9650129ac461';
  private clientSecret = 'a2d0ea09e1e34cf9be0003fbd910ca99';
  
  private token: string = '';
  
  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  private albumsSubject = new BehaviorSubject<any[]>([]);
  albums$ = this.albumsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getToken();
  }
  private getToken(): void {
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post<any>('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials',
      { headers }
    ).subscribe({
      next: (response) => {
        this.token = response.access_token;
        console.log('Token obtenido correctamente');
      },
      error: (error) => {
        console.error('Error obteniendo token:', error);
      }
    });
  }

  searchTracks(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.apiUrl}/search?q=${query}&type=track&limit=10`, { headers })
      .pipe(
        map((response: any) => {
          const tracks = response.tracks.items.map((track: any) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name,
            album: track.album?.name,
            duration: Math.floor(track.duration_ms / 1000),
            image: track.album?.images[0]?.url
          }));
          this.searchResultsSubject.next(tracks);
          return tracks;
        })
      );
  }

  searchAlbums(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.apiUrl}/search?q=${query}&type=album&limit=10`, { headers })
      .pipe(
        map((response: any) => {
          const albums = response.albums.items.map((album: any) => ({
            id: album.id,
            name: album.name,
            artist: album.artists[0]?.name,
            year: album.release_date?.split('-')[0],
            image: album.images[0]?.url 
          }));
          this.albumsSubject.next(albums);
          return albums;
        })
      );
  }

  getNewReleases(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.apiUrl}/browse/new-releases?limit=12`, { headers })
      .pipe(
        map((response: any) => {
          const albums = response.albums.items.map((album: any) => ({
            id: album.id,
            name: album.name,
            artist: album.artists[0]?.name,
            year: album.release_date?.split('-')[0],
            image: album.images[0]?.url
          }));
          this.albumsSubject.next(albums);
          return albums;
        })
      );
  }
}