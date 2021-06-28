import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/todo/ITodo';
import { UserLogin } from '../models/Auth/UserLogin';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TodoService } from '../Services/Todo/todo.service';

@Component({
  selector: 'app-form-todo-edit',
  templateUrl: './form-todo-edit.component.html',
  styleUrls: ['./form-todo-edit.component.scss']
})
export class FormTodoEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private todoServices: TodoService) { }

  private _id: any = '';
  jwtHelpers = new JwtHelperService();
  public level: string[] = ['Small', 'Medium', 'High'];
  private userLogin!: UserLogin;

  public todo: ITodo = {
    id: 0,
    name: '',
    level: '',
    isDone: false
  };

  async ngOnInit() {
    // this.handleCheckLogin();
    this.todoServices.handleCheckLogin();
    // this.checkExpired();
    this.todoServices.checkExpired();
    this._id = this.route.snapshot.params.id;
    this.todoServices.getTodo(this._id).subscribe(data => this.todo = data);
    // this.todo = data;
  }

  editTodo() {
    this.todoServices.checkExpired();
    this.todoServices.editTodo(this.todo.id, this.todo.name, this.todo.level, this.todo.isDone);
  }


}
