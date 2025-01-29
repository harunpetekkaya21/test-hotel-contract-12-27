import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContractsTabViewComponent } from './supplier-contracts-tab-view.component';

describe('SupplierContractsTabViewComponent', () => {
  let component: SupplierContractsTabViewComponent;
  let fixture: ComponentFixture<SupplierContractsTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierContractsTabViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierContractsTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
