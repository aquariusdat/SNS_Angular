import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/todo/ITodo';
@Component({
  selector: 'app-form-todo-edit',
  templateUrl: './form-todo-edit.component.html',
  styleUrls: ['./form-todo-edit.component.scss']
})
export class FormTodoEditComponent implements OnInit {

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  private _id: any = '';

  public level: string[] = ['Small', 'Medium', 'High'];

  public todo: ITodo = {
    id: 0,
    name: '',
    level: '',
    isDone: false
  };

  async ngOnInit() {

    this._id = this.router.snapshot.params.id;

    const url = `https://localhost:44332/api/v1/todos/${this._id}`;

    const res = await fetch(url);
    const data = await res.json();

    this.todo = data;
  }

  editTodo() {
    console.log(`id: ${this.todo.id}\nname: ${this.todo.name}\nlevel: ${this.todo.level}\nisDone: ${this.todo.isDone}`);
    const formData: any = new FormData();
    formData.append("Id", this.todo.id);
    formData.append("Name", this.todo.name);
    formData.append("Level", this.todo.level);
    formData.append("IsDone", this.todo.isDone);

    const path = 'https://localhost:44332/api/v1/todos';

    this.http.put(path, formData).subscribe((data) => {
      let result: any = {}
      result = data;

      if (!result.isSuccess) {
        alert(`Can not add this todo. \nPlease check data and submit again.`)
        return;
      }

      alert('Successfully.')
      return;
    })
  }
}
