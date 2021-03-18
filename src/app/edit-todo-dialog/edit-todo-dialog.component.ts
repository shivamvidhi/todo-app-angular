import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {


  todos:Todo[];
  showValidationErrors:boolean = false;
  duplicate:boolean = false;
  constructor(public dialogRef:MatDialogRef<EditTodoDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public todo:Todo, private dataService:DataService) { }
  

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  close(){
    this.dialogRef.close();
  }
  onFormSubmit(form:NgForm){
    if(form.invalid){

      return this.showValidationErrors = true;

    }
    if(!this.duplicate)
    {
      const updatedTodo ={
        ...this.todo,
        ...form.value
      }
      this.dialogRef.close(updatedTodo);
    }
  }
  duplicateCheck(value)
  {
    console.log(value);
    if(this.todos.findIndex((item)=>item.text == value)>=0)
    {
      return this.duplicate = true;
    }
    else{
      return this.duplicate = false;
    }
  }
}
