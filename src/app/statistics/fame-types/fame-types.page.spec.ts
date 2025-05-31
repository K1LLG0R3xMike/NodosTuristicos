import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FameTypesPage } from './fame-types.page';

describe('FameTypesPage', () => {
  let component: FameTypesPage;
  let fixture: ComponentFixture<FameTypesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FameTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
