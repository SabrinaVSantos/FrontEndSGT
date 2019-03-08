import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharComponent } from './acompanhar.component';

describe('AcompanharComponent', () => {
  let component: AcompanharComponent;
  let fixture: ComponentFixture<AcompanharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcompanharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
