import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTestingRealmComponent } from './audio-testing-realm.component';

describe('AudioTestingRealmComponent', () => {
  let component: AudioTestingRealmComponent;
  let fixture: ComponentFixture<AudioTestingRealmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTestingRealmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTestingRealmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
