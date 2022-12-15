import { ITodo } from './models/todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get('api/todos');
  }

  createTodo(data: ITodo) {
    return this.http.post('api/todos', data);
  }

  deleteTodo(id: number) {
    return this.http.delete(`api/todos/${id}`);
  }

  getTodo(id: number) {
    return this.http.get(`api/todos/${id}`);
  }

  updateTodo(id: number, todo: ITodo) {
    return this.http.put(`api/todos/${id}`, todo);
  }
}
