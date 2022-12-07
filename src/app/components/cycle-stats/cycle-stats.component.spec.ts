import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleStatsComponent } from './cycle-stats.component';

describe('CycleStatsComponent', () => {
  let component: CycleStatsComponent;
  let fixture: ComponentFixture<CycleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
