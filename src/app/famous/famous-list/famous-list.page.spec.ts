import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamousListPage } from './famous-list.page';

describe('FamousListPage', () => {
  let component: FamousListPage;
  let fixture: ComponentFixture<FamousListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamousListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
