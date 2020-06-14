import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableConnectedGroupModalComponent } from './available-connected-group-modal.component';

describe('AvailableConnectedGroupModalComponent', () => {
  let component: AvailableConnectedGroupModalComponent;
  let fixture: ComponentFixture<AvailableConnectedGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableConnectedGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableConnectedGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
