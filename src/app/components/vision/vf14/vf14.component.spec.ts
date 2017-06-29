import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VF14Component } from './vf14.component';

describe('VF14Component', () => {
  let component: VF14Component;
  let fixture: ComponentFixture<VF14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VF14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VF14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
