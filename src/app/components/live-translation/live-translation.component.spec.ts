import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTranslationComponent } from './live-translation.component';

describe('LiveTranslationComponent', () => {
  let component: LiveTranslationComponent;
  let fixture: ComponentFixture<LiveTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
