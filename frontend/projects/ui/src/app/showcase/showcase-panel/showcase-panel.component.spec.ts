import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcasePanelComponent } from './showcase-panel.component';

describe('ShowcasePanelComponent', () => {
  let component: ShowcasePanelComponent;
  let fixture: ComponentFixture<ShowcasePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcasePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowcasePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
