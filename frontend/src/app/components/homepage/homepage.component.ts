import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { TodoService} from '../../services/todo.service';
import { TodoInterFace } from '../../interfaces/todo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  todoForm: FormGroup;
  todos;


  todo = {
    id: '',
    todoTitle: '',
    todoImg: null
    };

  imgPreview;
  todosLoaded = false;

  paginator = {
    previousPageIndex : 0,
    pageIndex: 0,
    pageSize : 2
  };

  todosTotalNum: number;


  constructor(
    private todoService: TodoService,
    private userService: UserService
    ) { }

  ngOnInit() {
    // Get existing todos
    console.log(this.userService.getIsAuth());
    this.getTodos();


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
    this.todoService.getFromDB(this.paginator).subscribe((response: any) => {
      this.todos = response.documents;
      this.todosTotalNum = response.totalNumTodos;
      console.log(response);
      if (this.todos.length > 0) {
        this.todosLoaded = true;
      }

    });
  }

  deleteTodo(id: string) {
    console.log(id);
    this.todoService.deleteFromDB(id);

    this.todos.forEach((todo, index) => {

      if (id === todo._id) {
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




  paginatorChanged(paginator) {
    this.paginator.previousPageIndex = paginator.previousPageIndex;
    this.paginator.pageIndex = paginator.pageIndex;
    this.paginator.pageSize = paginator.pageSize;
    this.getTodos();
  }


  logout() {
    // if (this.userService.isAuthenticated()) {
    //   console.log('aut');
    // } else {
    //   console.log('nem');

    // }
   console.log( this.userService.isAuthenticated());
  }

}
