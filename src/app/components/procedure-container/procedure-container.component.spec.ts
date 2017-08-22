import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureContainerComponent } from './procedure-container.component';

describe('ProcedureContainerComponent', () => {
  let component: ProcedureContainerComponent;
  let fixture: ComponentFixture<ProcedureContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
