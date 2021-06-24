import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/todo/ITodo';
import { UserLogin } from '../models/Auth/UserLogin';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-form-todo-edit',
  templateUrl: './form-todo-edit.component.html',
  styleUrls: ['./form-todo-edit.component.scss']
})
export class FormTodoEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

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

  getHeaders() {
    return {
      headers: new HttpHeaders({
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
  handleCheckLogin(): any {
    this.userLogin = JSON.parse(localStorage.getItem('dataLogin')!);
    console.log(this.userLogin);
    if (this.userLogin == null) {
      alert('Please login again.');
      return this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    this.handleCheckLogin();
    this.checkExpired();
    this._id = this.route.snapshot.params.id;

    const url = `https://localhost:44332/api/v1/todos/${this._id}`;

    // const res = await fetch(url);
    // const data = await res.json();

    this.http.get<ITodo>(url, this.getHeaders()).subscribe(
      (data) => {
        this.todo = data;
      },
      (error) => {

      }
    )

    // this.todo = data;
  }

  editTodo() {
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
