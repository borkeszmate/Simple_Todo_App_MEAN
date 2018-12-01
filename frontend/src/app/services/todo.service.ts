
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HomepageComponent } from '../components/homepage/homepage.component';
import { TodoInterFace } from '../interfaces/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  postToDB(todo: TodoInterFace) {


    const formData = new FormData();
    formData.append('todoTitle', todo.todoTitle);
    formData.append('image', todo.todoImg);
    console.log(formData.get('image'));

    return this.http.post('http://localhost:3000/api/todos/posts', formData);
  }

  getFromDB(paginator) {
   return this.http.get(
     `http://localhost:3000/api/todos/posts?previousPageIndex=${paginator.previousPageIndex}&pageIndex=${paginator.pageIndex}&pageSize=${paginator.pageSize}`
     );

  }


  deleteFromDB(id) {
    this.http.delete(`http://localhost:3000/api/todos/posts/${id}` ).subscribe(response => console.log(response));

    // console.log('http://localhost:3000/api/todos/' + id);
  }


}
