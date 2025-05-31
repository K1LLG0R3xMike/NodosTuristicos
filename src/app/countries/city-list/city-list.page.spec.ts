import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityListPage } from './city-list.page';

describe('CityListPage', () => {
  let component: CityListPage;
  let fixture: ComponentFixture<CityListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
