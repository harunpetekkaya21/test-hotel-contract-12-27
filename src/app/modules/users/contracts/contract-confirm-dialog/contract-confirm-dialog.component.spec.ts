import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractConfirmDialogComponent } from './contract-confirm-dialog.component';

describe('ContractConfirmDialogComponent', () => {
  let component: ContractConfirmDialogComponent;
  let fixture: ComponentFixture<ContractConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
