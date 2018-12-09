
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HomepageComponent } from '../components/homepage/homepage.component';
import { TodoInterFace } from '../interfaces/todo';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  apiUrl = environment.http;

  constructor(private http: HttpClient) {
   }

  postToDB(todo: TodoInterFace) {
    // Creating formdata in order to submit a file in the form
    const formData = new FormData();
    formData.append('todoTitle', todo.todoTitle);
    formData.append('image', todo.todoImg);

    // Setting http header


    const httpOptions = {
      headers: new HttpHeaders({
        authtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvcmtlc3ptYXRlQGdtYWlsLmNvbSIsImlhdCI6MTU0NDM4NDQ1NCwiZXhwIjoxNTQ0Mzg4MDU0fQ.ZtNeRSzKAzOkqRRmHfaI5EFDwfQPfDDjc9NsI9j-b4k'
      })
    };
    return this.http.post(`${this.apiUrl}/api/todos/posts`, formData, httpOptions);
  }

  getFromDB(paginator) {

   return this.http.get(
     `${this.apiUrl}/api/todos/posts?previousPageIndex=${paginator.previousPageIndex}&pageIndex=${paginator.pageIndex}&pageSize=${paginator.pageSize}`
     );

  }


  deleteFromDB(id) {

    this.http.delete(`${this.apiUrl}/api/todos/posts/${id}` ).subscribe(response => console.log(response));

    // console.log('http://localhost:3000/api/todos/posts' + id);
  }


}
