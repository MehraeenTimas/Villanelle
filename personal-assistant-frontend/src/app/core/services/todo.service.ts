// personal-assistant-frontend/src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos`);
  }

  createTodo(data: CreateTodoRequest): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiUrl}/todos`, data);
  }

  updateTodo(id: number, data: UpdateTodoRequest): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/todos/${id}`, data);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/todos/${id}`);
  }
}
