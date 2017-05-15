import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointDisplayComponent } from './point-display.component';

describe('PointDisplayComponent', () => {
  let component: PointDisplayComponent;
  let fixture: ComponentFixture<PointDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
