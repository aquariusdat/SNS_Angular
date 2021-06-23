import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTodoEditComponent } from './form-todo-edit.component';

describe('FormTodoEditComponent', () => {
  let component: FormTodoEditComponent;
  let fixture: ComponentFixture<FormTodoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTodoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
