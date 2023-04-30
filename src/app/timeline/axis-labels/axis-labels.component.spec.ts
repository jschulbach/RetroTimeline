import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisLabelsComponent } from './axis-labels.component';

describe('AxisLabelsComponent', () => {
  let component: AxisLabelsComponent;
  let fixture: ComponentFixture<AxisLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxisLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
