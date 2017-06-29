import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IQCODEComponent } from './iqcode.component';

describe('IQCODEComponent', () => {
  let component: IQCODEComponent;
  let fixture: ComponentFixture<IQCODEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IQCODEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IQCODEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
