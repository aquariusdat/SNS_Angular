import { Component, OnInit } from '@angular/core';
import { ITodo } from '../models/todo/ITodo';
import { MockData } from '../../actions/todo.actions'
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


  public todos: ITodo[] = [

  ]

  public name = '';
  public id = 0;
  public level = '';
  public isDone = false;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.getTodos();
  }

  public async getTodos() {
    const res = await fetch('https://localhost:44332/api/v1/todos');
    const data = await res.json();
    this.todos = data;

  }

  public deleteTodo(_id: number): void {
    const url = `https://localhost:44332/api/v1/todos/${_id}`
    this.http.delete(url).subscribe((data) => {
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
    const formData: any = new FormData();
    formData.append("Id", this.id);
    formData.append("Name", this.name);
    formData.append("Level", this.level);
    formData.append("IsDone", this.isDone);

    const path = 'https://localhost:44332/api/v1/todos';

    this.http.post(path, formData).subscribe((data) => {
      let result: any = {}
      result = data;

      if (!result.isSuccess) {
        alert(`Can not add this todo. \nPlease check data and submit again.`)
        return;
      }

      this.getTodos();
    })

  }
}
