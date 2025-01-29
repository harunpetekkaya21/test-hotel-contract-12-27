import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OteltypeTemasComponent } from './oteltype-temas.component';

describe('OteltypeTemasComponent', () => {
  let component: OteltypeTemasComponent;
  let fixture: ComponentFixture<OteltypeTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OteltypeTemasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OteltypeTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
