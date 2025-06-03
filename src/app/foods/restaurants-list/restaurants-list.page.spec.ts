import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantsListPage } from './restaurants-list.page';

describe('RestaurantsListPage', () => {
  let component: RestaurantsListPage;
  let fixture: ComponentFixture<RestaurantsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
