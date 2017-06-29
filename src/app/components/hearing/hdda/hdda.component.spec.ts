import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HDDAComponent } from './hdda.component';

describe('HDDAComponent', () => {
  let component: HDDAComponent;
  let fixture: ComponentFixture<HDDAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HDDAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HDDAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
