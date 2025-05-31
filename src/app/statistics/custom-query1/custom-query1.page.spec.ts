import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomQuery1Page } from './custom-query1.page';

describe('CustomQuery1Page', () => {
  let component: CustomQuery1Page;
  let fixture: ComponentFixture<CustomQuery1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQuery1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
