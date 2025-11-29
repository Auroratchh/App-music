import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Track } from '../../core/models/track';
import { PlayerService } from '../../core/services/player';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class PlayerComponent implements OnInit, OnDestroy {

  currentTrack: Track | null = null;
  currentTime: string = '0:00';
  totalTime: string = '0:00';

  private trackSubscription?: Subscription;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.trackSubscription = this.playerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
      if (track) {
        this.totalTime = this.formatTime(track.duration);
        this.currentTime = '0:00';
      }
    });
  }

  ngOnDestroy(): void {
    this.trackSubscription?.unsubscribe();
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}