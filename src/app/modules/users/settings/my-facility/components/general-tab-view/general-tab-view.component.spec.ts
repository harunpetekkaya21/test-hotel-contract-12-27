import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTabViewComponent } from './general-tab-view.component';

describe('GeneralTabViewComponent', () => {
  let component: GeneralTabViewComponent;
  let fixture: ComponentFixture<GeneralTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralTabViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
