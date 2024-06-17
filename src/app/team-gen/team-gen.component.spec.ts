import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGenComponent } from './team-gen.component';

describe('TeamGenComponent', () => {
  let component: TeamGenComponent;
  let fixture: ComponentFixture<TeamGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamGenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
