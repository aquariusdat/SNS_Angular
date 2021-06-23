import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormTodoAddComponent } from './form-todo-add/form-todo-add.component';
import { FormTodoEditComponent } from './form-todo-edit/form-todo-edit.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: TodoListComponent },
  { path: 'edit/:id', component: FormTodoEditComponent },
  { path: '**', component: TodoListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    FormTodoAddComponent,
    FormTodoEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
