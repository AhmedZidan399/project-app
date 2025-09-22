import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlySale } from './yearly-sale';

describe('YearlySale', () => {
  let component: YearlySale;
  let fixture: ComponentFixture<YearlySale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlySale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlySale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
