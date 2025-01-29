import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContractsComponent } from './supplier-contracts.component';

describe('SupplierContractsComponent', () => {
  let component: SupplierContractsComponent;
  let fixture: ComponentFixture<SupplierContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
