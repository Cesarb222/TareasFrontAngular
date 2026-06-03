import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoHome } from './proyecto-home';

describe('ProyectoHome', () => {
  let component: ProyectoHome;
  let fixture: ComponentFixture<ProyectoHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
