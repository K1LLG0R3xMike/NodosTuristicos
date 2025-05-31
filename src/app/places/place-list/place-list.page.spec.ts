import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceListPage } from './place-list.page';

describe('PlaceListPage', () => {
  let component: PlaceListPage;
  let fixture: ComponentFixture<PlaceListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
