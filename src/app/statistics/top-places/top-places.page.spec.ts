import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPlacesPage } from './top-places.page';

describe('TopPlacesPage', () => {
  let component: TopPlacesPage;
  let fixture: ComponentFixture<TopPlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
