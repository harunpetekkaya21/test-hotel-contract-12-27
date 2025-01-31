import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSaleConfirmDialogComponent } from './stop-sale-confirm-dialog.component';

describe('StopSaleConfirmDialogComponent', () => {
  let component: StopSaleConfirmDialogComponent;
  let fixture: ComponentFixture<StopSaleConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopSaleConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopSaleConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
