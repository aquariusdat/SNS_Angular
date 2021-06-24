import { Component, OnInit } from '@angular/core';
import { ITodo } from '../models/todo/ITodo';
import { MockData } from '../../actions/todo.actions'
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../models/Auth/UserLogin';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // List todo, get data from API
  public todos: ITodo[] = [

  ]

  jwtHelpers = new JwtHelperService();

  // Form add
  public name = '';
  public id = 0;
  public level = '';
  public isDone = false;

  private userLogin!: UserLogin;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b25kYXQiLCJleHAiOjE2MjQ1MjAwOTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.F1qD2KPIQ_Mm58axr0RBU6z3nH6v_8DmW0gTva3JwLM'
    })
  }


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  handleCheckLogin(): any {
    this.userLogin = JSON.parse(localStorage.getItem('dataLogin')!);
    if (this.userLogin == null) {
      return this.router.navigate(['/login']);
    }
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userLogin.token}`
      })
    };
  }

  checkExpired(): any {
    const rs = this.jwtHelpers.isTokenExpired(this.userLogin.token);
    if (rs) {
      localStorage.removeItem('dataLogin');
      return this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    this.handleCheckLogin();
    this.getTodos();
  }



  public async getTodos() {
    this.checkExpired();
    const path = 'https://localhost:44332/api/v1/todos';

    this.http.get<ITodo[]>(path, this.getHeaders()).subscribe((data) => {
      this.todos = data;
    })
  }

  public deleteTodo(_id: number): void {
    this.checkExpired();
    if (!confirm('Are u wanna delete this todo ?')) {
      return;
    }

    const url = `https://localhost:44332/api/v1/todos/${_id}`
    this.http.delete(url, this.getHeaders()).subscribe((data) => {
      let result: any = {};
      result = data;

      if (!result.isSuccess) {
        alert(`Can not delete todo.\nPlease delete again.`)
        return;
      }
      this.getTodos();
    })
  }

  public addTodo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Level: ${this.level}, Is done?: ${this.isDone}`)
    this.checkExpired();
    // check form data;
    let result = this.checkFormData();
    if (!result) {
      return;
    }

    const formData: any = new FormData();
    formData.append("Id", this.id);
    formData.append("Name", this.name);
    formData.append("Level", this.level);
    formData.append("IsDone", this.isDone);

    const path = 'https://localhost:44332/api/v1/todos';

    this.http.post(path, formData, this.getHeaders()).subscribe((data) => {
      let result: any = {}
      result = data;

      if (!result.isSuccess) {
        alert(`Can not add this todo. \nPlease check data and submit again.`)
        return;
      }

      this.getTodos();
    })

  }

  public checkFormData(): boolean {
    let alertString = 'Please enter all information.';
    if (this.id === 0 || this.id === null || this.name.length === 0 || this.level === '') {
      alert(alertString);
      return false;
    }

    return true;
  }

}
