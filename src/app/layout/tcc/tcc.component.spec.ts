import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccComponent } from './tcc.component';

describe('TccComponent', () => {
  let component: TccComponent;
  let fixture: ComponentFixture<TccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
