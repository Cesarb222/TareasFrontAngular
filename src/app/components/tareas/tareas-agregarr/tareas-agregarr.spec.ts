import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAgregarr } from './tareas-agregarr';

describe('TareasAgregarr', () => {
  let component: TareasAgregarr;
  let fixture: ComponentFixture<TareasAgregarr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasAgregarr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasAgregarr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
