import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../../models/Auth/UserLogin';
import { ITodo } from '../../models/todo/ITodo';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  jwtHelpers = new JwtHelperService();
  private userLogin!: UserLogin;
  // List todo, get data from API
  public todos: ITodo[] = [

  ]

  public todo: ITodo = {
    id: 0,
    name: '',
    level: '',
    isDone: false
  };

  // Form add
  public name = '';
  public id = 0;
  public level = '';
  public isDone = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  checkExpired(): any {
    const rs = this.jwtHelpers.isTokenExpired(this.userLogin.token);
    if (rs) {
      localStorage.removeItem('dataLogin');
      return this.router.navigate(['/login']);
    }
  }

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

  public getTodos(): Observable<ITodo[]> {
    this.checkExpired();
    const path = 'https://localhost:44332/api/v1/todos';

    // this.http.get<ITodo[]>(path, this.getHeaders()).subscribe((data) => {
    //   this.todos = data;
    //   return this.todos;
    // })

    return this.http.get<ITodo[]>(path, this.getHeaders());

  }

  public deleteTodo(_id: number) {
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
      console.log('delete is success');
      return;
    })
  }

  public addTodo(id: any, name: any, level: any, isDone: any) {

    this.id = id;
    this.name = name;
    this.level = level;
    this.isDone = isDone;

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

      return;
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

  public getTodo(id: any): Observable<ITodo> {

    const url = `https://localhost:44332/api/v1/todos/${id}`;

    // const res = await fetch(url);
    // const data = await res.json();

    return this.http.get<ITodo>(url, this.getHeaders());

  }

  public editTodo(id: any, name: any, level: any, isDone: any) {
    this.todo.id = id;
    this.todo.name = name;
    this.todo.level = level;
    this.todo.isDone = isDone;

    console.log(`id: ${this.todo.id}\nname: ${this.todo.name}\nlevel: ${this.todo.level}\nisDone: ${this.todo.isDone}`);
    this.checkExpired();

    const formData: any = new FormData();
    formData.append("Id", this.todo.id);
    formData.append("Name", this.todo.name);
    formData.append("Level", this.todo.level);
    formData.append("IsDone", this.todo.isDone);

    const path = 'https://localhost:44332/api/v1/todos';

    this.http.put(path, formData, this.getHeaders()).subscribe((data) => {
      let result: any = {}
      result = data;

      if (!result.isSuccess) {
        alert(`Can not edit this todo. \nPlease check data and submit again.`)
        return;
      }

      alert('Successfully.')
      return;
    })
  }
}
