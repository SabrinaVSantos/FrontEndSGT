import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprojetoComponent } from './preprojeto.component';

describe('PreprojetoComponent', () => {
  let component: PreprojetoComponent;
  let fixture: ComponentFixture<PreprojetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreprojetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprojetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
