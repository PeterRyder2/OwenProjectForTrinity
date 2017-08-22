import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSelectionComponent } from './chapter-selection.component';

describe('ChapterSelectionComponent', () => {
  let component: ChapterSelectionComponent;
  let fixture: ComponentFixture<ChapterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
