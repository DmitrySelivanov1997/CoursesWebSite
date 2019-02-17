import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegister } from './register-dialog.component';

describe('RegisterDialogComponent', () => {
  let component: DialogRegister;
  let fixture: ComponentFixture<DialogRegister>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegister ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
