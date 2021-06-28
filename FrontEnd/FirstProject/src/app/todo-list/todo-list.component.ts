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

  public deleteTodo(_id: number) {
    this.todoServices.deleteTodo(_id);

    setTimeout(() => {
      this.todoServices.getTodos().subscribe((data) => {
        this.todos = data;
      });
    }, 100)

  }

  public addTodo(): void {
    this.todoServices.addTodo(this.id, this.name, this.level, this.isDone);

    setTimeout(() => {
      this.todoServices.getTodos().subscribe((data) => {
        this.todos = data;
      });
    }, 100)
  }

}
