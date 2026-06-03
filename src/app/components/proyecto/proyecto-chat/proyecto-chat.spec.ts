import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoChat } from './proyecto-chat';

describe('ProyectoChat', () => {
  let component: ProyectoChat;
  let fixture: ComponentFixture<ProyectoChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
