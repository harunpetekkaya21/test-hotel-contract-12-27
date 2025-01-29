import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationPolicyTabViewComponent } from './cancellation-policy-tab-view.component';

describe('CancellationPolicyTabViewComponent', () => {
  let component: CancellationPolicyTabViewComponent;
  let fixture: ComponentFixture<CancellationPolicyTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationPolicyTabViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationPolicyTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
