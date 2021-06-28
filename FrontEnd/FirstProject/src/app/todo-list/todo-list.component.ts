import { Component, OnInit } from '@angular/core';
import { ITodo } from '../models/todo/ITodo';
import { MockData } from '../../actions/todo.actions'
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../models/Auth/UserLogin';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TodoService } from '../Services/Todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // List todo, get data from API
  public todos: ITodo[] = [

  ];

  jwtHelpers = new JwtHelperService();

  // Form add
  public name = '';
  public id = 0;
  public level = '';
  public isDone = false;

  private userLogin!: UserLogin;

  constructor(private todoServices: TodoService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.todoServices.handleCheckLogin();
    this.todoServices.getTodos().subscribe(async (data) => {
      this.todos = await data;
    });

  }

  public getTodos(): void {
    this.todoServices.checkExpired();
    const path = 'https://localhost:44332/api/v1/todos';

    this.http.get<ITodo[]>(path, this.todoServices.getHeaders()).subscribe((data) => {
      this.todos = data;
    });

  }

  public deleteTodo(_id: number) {
    this.todoServices.checkExpired();
    if (!confirm('Are u wanna delete this todo ?')) {
      return;
    }

    const url = `https://localhost:44332/api/v1/todos/${_id}`
    this.http.delete(url, this.todoServices.getHeaders()).subscribe((data) => {
      let result: any = {};
      result = data;

      if (!result.isSuccess) {
        alert(`Can not delete todo.\nPlease delete again.`)
        return;
      }
      this.getTodos();
      console.log('delete is success');
      return;
    })
  }

  public addTodo(): void {
    this.todoServices.addTodo(this.id, this.name, this.level, this.isDone).then(() => {
      this.todoServices.getTodos().subscribe((data) => {
        this.todos = data;
      })
    });


  }

}
