import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoaderComponent } from './lazy-loader.component';

describe('LazyLoaderComponent', () => {
  let component: LazyLoaderComponent;
  let fixture: ComponentFixture<LazyLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
