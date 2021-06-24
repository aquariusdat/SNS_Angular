import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../models/Auth/UserLogin';
import { Router, ActivatedRoute, ParamMap, ActivationEnd } from '@angular/router';
@Component({
  selector: 'app-form-todo-add',
  templateUrl: './form-todo-add.component.html',
  styleUrls: ['./form-todo-add.component.scss']
})
export class FormTodoAddComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivationEnd, private router: Router) { }

  public name = '';
  public id = 0;
  public level = '';
  public isDone = false;


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  ngOnInit(): void {

  }

  public addTodo(): void {
    const formData: any = new FormData();
    formData.append("Id", this.id);
    formData.append("Name", this.name);
    formData.append("Level", this.level);
    formData.append("IsDone", this.isDone);

    console.log(formData);

    const path = 'https://localhost:44332/api/v1/todos';

    this.http.post(path, formData).subscribe((data) => {
      console.log(data);
    })

  }
}
