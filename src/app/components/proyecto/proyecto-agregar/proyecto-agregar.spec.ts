import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoAgregar } from './proyecto-agregar';

describe('ProyectoAgregar', () => {
  let component: ProyectoAgregar;
  let fixture: ComponentFixture<ProyectoAgregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoAgregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoAgregar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
