import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincongesComponent } from './adminconges.component';

describe('AdmincongesComponent', () => {
  let component: AdmincongesComponent;
  let fixture: ComponentFixture<AdmincongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincongesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
