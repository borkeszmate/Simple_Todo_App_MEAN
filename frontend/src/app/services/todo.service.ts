
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

    return this.http.post('http://localhost:3000/api/todos', todo);
  }

  getFromDB() {
   return this.http.get('http://localhost:3000/api/todos');

  }

  deleteFromDB(id) {
    this.http.delete(`http://localhost:3000/api/todos/${id}` ).subscribe(response => console.log(response));

    // console.log('http://localhost:3000/api/todos/' + id);
  }


}
