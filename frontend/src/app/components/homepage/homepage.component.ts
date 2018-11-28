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
    todoTitle: '',
    todoImg: null
    }
  ;

  imgPreview;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
// Get existing todos
  this.getTodos();
  console.log(this.imgPreview);



// Create form
    this.todoForm = new FormGroup({
      todo: new FormControl('', Validators.required),
      todoImg: new FormControl(null)
    });
  }

  todoSubmit() {
    this.todo.todoTitle = this.todoForm.value.todo;
    this.todo.todoImg = this.todoForm.value.todoImg;
    this.todoService.postToDB(this.todo).subscribe(response => {
      console.log(`${this.todo.todoTitle} is succesfully added! :)`);
      this.getTodos();
    });


  }

  getTodos() {
    this.todoService.getFromDB().subscribe(response => {
      this.todos = response;
      console.log(this.todos);

    });
  }

  deleteTodo(id) {
    console.log(id);
    this.todoService.deleteFromDB(id);

    this.todos.forEach((todo, index) => {

      if (id === todo.id) {
        this.todos.splice(index, 1);
      }
    });
  }

  imageAdded(event) {
    const file = event.target.files[0];
    // console.log(file);
    this.todoForm.patchValue({
      todoImg: file
    });
    this.todoForm.get('todoImg').updateValueAndValidity();
    // console.log(this.todoForm);
    // const file = event
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
    reader.readAsDataURL(file);

  }

}
