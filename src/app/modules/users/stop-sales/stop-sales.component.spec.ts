import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSalesComponent } from './stop-sales.component';

describe('StopSalesComponent', () => {
  let component: StopSalesComponent;
  let fixture: ComponentFixture<StopSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
