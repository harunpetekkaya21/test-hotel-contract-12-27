import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsAquaComponent } from './pools-aqua.component';

describe('PoolsAquaComponent', () => {
  let component: PoolsAquaComponent;
  let fixture: ComponentFixture<PoolsAquaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolsAquaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoolsAquaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
