import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsMealPlanTabViewComponent } from './rooms-meal-plan-tab-view.component';

describe('RoomsMealPlanTabViewComponent', () => {
  let component: RoomsMealPlanTabViewComponent;
  let fixture: ComponentFixture<RoomsMealPlanTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsMealPlanTabViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsMealPlanTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
