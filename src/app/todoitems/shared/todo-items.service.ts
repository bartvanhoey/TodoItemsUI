import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TodoItem } from 'src/app/models/todo-item';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  private readonly baseUrl = 'http://localhost:5000/api/todoitems';

  constructor(private http: HttpClient) { }

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(this.baseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  getTodoItemFromList(id: number, todoItems: TodoItem[]): TodoItem {
    return todoItems.find(todoItem => todoItem.id === id);
  }

  saveTodoItem(todoitem: TodoItem): Observable<TodoItem> {
    if (todoitem.id === undefined) {
      return this.http.post<TodoItem>(this.baseUrl, todoitem, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.put<TodoItem>(this.baseUrl + '/' + todoitem.id, todoitem, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
        .pipe(catchError(this.handleError));
    }
  }

  deleteTodoItem(id: number): Observable<TodoItem> {
    return this.http.delete<TodoItem>(this.baseUrl + '/' + id).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client Side Error: ', errorResponse.error.message);
    } else {
      console.log('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
