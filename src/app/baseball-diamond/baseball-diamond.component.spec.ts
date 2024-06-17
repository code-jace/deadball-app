import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballDiamondComponent } from './baseball-diamond.component';

describe('BaseballDiamondComponent', () => {
  let component: BaseballDiamondComponent;
  let fixture: ComponentFixture<BaseballDiamondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballDiamondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballDiamondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
