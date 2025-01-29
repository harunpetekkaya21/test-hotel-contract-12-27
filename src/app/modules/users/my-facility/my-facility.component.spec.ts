import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilityComponent } from './my-facility.component';

describe('MyFacilityComponent', () => {
  let component: MyFacilityComponent;
  let fixture: ComponentFixture<MyFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFacilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
