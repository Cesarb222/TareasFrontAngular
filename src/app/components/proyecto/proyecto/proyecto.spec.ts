import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoComponent } from './proyecto';

describe('Proyecto', () => {
  let component: ProyectoComponent;
  let fixture: ComponentFixture<ProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
