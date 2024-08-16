import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemDetailsComponent } from './catalog-item-details.component';

describe('CatalogItemDetailsComponent', () => {
  let component: CatalogItemDetailsComponent;
  let fixture: ComponentFixture<CatalogItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogItemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
