import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamousDetailPage } from './famous-detail.page';

describe('FamousDetailPage', () => {
  let component: FamousDetailPage;
  let fixture: ComponentFixture<FamousDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamousDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
