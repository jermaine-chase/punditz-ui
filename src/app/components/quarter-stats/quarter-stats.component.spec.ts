import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterStatsComponent } from './quarter-stats.component';

describe('QuarterStatsComponent', () => {
  let component: QuarterStatsComponent;
  let fixture: ComponentFixture<QuarterStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarterStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
