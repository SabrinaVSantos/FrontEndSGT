import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarDocumentosComponent } from './gerar-documentos.component';

describe('GerarDocumentosComponent', () => {
  let component: GerarDocumentosComponent;
  let fixture: ComponentFixture<GerarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
