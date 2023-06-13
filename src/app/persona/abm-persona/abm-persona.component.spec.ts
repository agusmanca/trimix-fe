import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPersonaComponent } from './abm-persona.component';

describe('AbmPersonaComponent', () => {
  let component: AbmPersonaComponent;
  let fixture: ComponentFixture<AbmPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmPersonaComponent]
    });
    fixture = TestBed.createComponent(AbmPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
