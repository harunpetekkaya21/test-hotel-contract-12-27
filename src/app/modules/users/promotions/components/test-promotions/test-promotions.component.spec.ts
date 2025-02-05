import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPromotionsComponent } from './test-promotions.component';

describe('TestPromotionsComponent', () => {
  let component: TestPromotionsComponent;
  let fixture: ComponentFixture<TestPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPromotionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
