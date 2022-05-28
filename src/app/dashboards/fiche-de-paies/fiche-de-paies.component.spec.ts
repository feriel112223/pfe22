import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDePaiesComponent } from './fiche-de-paies.component';

describe('FicheDePaiesComponent', () => {
  let component: FicheDePaiesComponent;
  let fixture: ComponentFixture<FicheDePaiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDePaiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDePaiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
