import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTodoAddComponent } from './form-todo-add.component';

describe('FormTodoAddComponent', () => {
  let component: FormTodoAddComponent;
  let fixture: ComponentFixture<FormTodoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTodoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTodoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
