import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtadefesaComponent } from './atadefesa.component';

describe('AtadefesaComponent', () => {
  let component: AtadefesaComponent;
  let fixture: ComponentFixture<AtadefesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtadefesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtadefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
