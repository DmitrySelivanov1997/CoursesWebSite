import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenRedirectComponent } from './forbidden-redirect.component';

describe('ForbiddenRedirectComponent', () => {
  let component: ForbiddenRedirectComponent;
  let fixture: ComponentFixture<ForbiddenRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbiddenRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
