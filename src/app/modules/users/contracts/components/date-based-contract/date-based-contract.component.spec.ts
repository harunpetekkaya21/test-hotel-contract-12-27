import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBasedContractComponent } from './date-based-contract.component';

describe('DateBasedContractComponent', () => {
  let component: DateBasedContractComponent;
  let fixture: ComponentFixture<DateBasedContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateBasedContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateBasedContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
