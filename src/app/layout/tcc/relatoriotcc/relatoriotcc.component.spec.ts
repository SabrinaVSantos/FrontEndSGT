import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriotccComponent } from './relatoriotcc.component';

describe('RelatoriotccComponent', () => {
  let component: RelatoriotccComponent;
  let fixture: ComponentFixture<RelatoriotccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriotccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriotccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
