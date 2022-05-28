import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierDeTravailComponent } from './calendrier-de-travail.component';

describe('CalendrierDeTravailComponent', () => {
  let component: CalendrierDeTravailComponent;
  let fixture: ComponentFixture<CalendrierDeTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierDeTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
