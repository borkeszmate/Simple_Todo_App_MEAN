import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService} from '../../services/todo.service';
import { TodoInterFace } from '../../interfaces/todo';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  todoForm;
  todos;

  todo = {
    id: '',
    todoTitle: ''
    }
  ;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
// Get existing todos
  this.getTodos();



// Create form
    this.todoForm = new FormGroup({
      todo: new FormControl('', Validators.required)
    });
  }

  todoSubmit() {
    this.todo.todoTitle = this.todoForm.value.todo;

    this.todoService.postToDB(this.todo).subscribe(response => {
      console.log(`${this.todo.todoTitle} is succesfully added! :)`);
      this.getTodos();
    });


  }

  getTodos() {
    this.todoService.getFromDB().subscribe(response => {
      this.todos = response;

    });
  }

  deleteTodo(id) {
    console.log(id);
    this.todoService.deleteFromDB(id);
  }

}
