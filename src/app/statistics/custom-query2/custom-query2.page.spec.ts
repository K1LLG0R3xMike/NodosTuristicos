import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomQuery2Page } from './custom-query2.page';

describe('CustomQuery2Page', () => {
  let component: CustomQuery2Page;
  let fixture: ComponentFixture<CustomQuery2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomQuery2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
