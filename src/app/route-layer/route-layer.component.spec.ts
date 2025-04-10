import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLayerComponent } from './route-layer.component';

describe('RouteLayerComponent', () => {
  let component: RouteLayerComponent;
  let fixture: ComponentFixture<RouteLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
