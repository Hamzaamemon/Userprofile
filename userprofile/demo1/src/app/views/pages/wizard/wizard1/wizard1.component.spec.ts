import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Wizard1Component } from './wizard1.component';

describe('Wizard1Component', () => {
  let component: Wizard1Component;
  let fixture: ComponentFixture<Wizard1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Wizard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wizard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
