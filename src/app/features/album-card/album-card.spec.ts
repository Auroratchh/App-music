import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCardComponent } from './album-card';

describe('AlbumCard', () => {
  let component: AlbumCardComponent;
  let fixture: ComponentFixture<AlbumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
