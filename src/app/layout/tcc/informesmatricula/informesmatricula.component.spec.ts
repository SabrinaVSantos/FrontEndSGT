import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesmatriculaComponent } from './informesmatricula.component';

describe('InformesmatriculaComponent', () => {
  let component: InformesmatriculaComponent;
  let fixture: ComponentFixture<InformesmatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesmatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesmatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
