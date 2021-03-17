import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  public todos: Todo[];
  public todo:Todo;
  public showValidationErrors : boolean = false;
  public duplicateElement:boolean = false;
  
  
  
  constructor(private dataService: DataService, private dialog : MatDialog) { }


  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }


  onFormSubmit(form: NgForm){

    if(form.invalid){

      return this.showValidationErrors = true;

    }
    if(this.duplicateElement)
    {
      return;
    }
    this.todo = new Todo(form.value.text);
    this.dataService.addTodo(this.todo);
    this.showValidationErrors = false;
    this.duplicateElement = false;
    form.reset();
  
  }


  duplicateCheck(value){
    if(this.todos.findIndex((item)=>item.text==value)>=0){
      return this.duplicateElement= true;
    }
    this.duplicateElement = false;
  }

  onTodoClicked(todo:Todo){
     todo.completed = !todo.completed;
  }

  onEditClicked(todo:Todo)
  {
    const index = this.todos.indexOf(todo);
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width:'800px',
      data : todo
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.dataService.updateTodo(index,result);
      }
    })
    console.log(index);
  }
  onDeleteClicked(todo:Todo)
  {
    const index = this.todos.indexOf(todo);
    this.dataService.deleteTodo(index);
    console.log(index);
  }
}

