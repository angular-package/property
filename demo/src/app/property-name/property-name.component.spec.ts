import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyNameComponent } from './property-name.component';

describe('PropertyNameComponent', () => {
  let component: PropertyNameComponent;
  let fixture: ComponentFixture<PropertyNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
