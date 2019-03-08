import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaaceiteComponent } from './cartaaceite.component';

describe('CartaaceiteComponent', () => {
  let component: CartaaceiteComponent;
  let fixture: ComponentFixture<CartaaceiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaaceiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaaceiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
