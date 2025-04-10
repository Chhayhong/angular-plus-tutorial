import { Component,inject,signal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import { TODO, TodoService } from '../service/create-todo.service';
import { DisplayTodoComponent } from '../display-todo/display-todo.component';

@Component({
  selector: 'app-create-todo',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,DisplayTodoComponent],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  readonly name = new FormControl('', [Validators.required]);
  todoService = inject(TodoService)
  errorMessage = signal('');
  isUpdate = signal(false);
  private todoUpdate:TODO | null = null;
  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.name.hasError('name')) {
      this.errorMessage.set('Not a valid name');
    } else {
      this.errorMessage.set('');
    }
  }

  onAddTodo(){
    const todo:TODO={
      id:this.todoService.getTodoId(),
      name:this.name.value as string,
      completed:false
    }
    this.todoService.addTodo(todo);
    this.name.reset()
  }
  
  updateTodoValue(todo:TODO){
    this.isUpdate.set(true)
    this.todoUpdate = todo;
    this.name.patchValue(todo.name)
  }

  onUpdate(){
    if(this.todoUpdate){
      this.todoService.updateTodo({
        ...this.todoUpdate,
        name:this.name.value as string
      })
      this.name.reset()
      this.isUpdate.set(false)
    }
  }

  onCancel(){
    this.name.reset()
    this.isUpdate.set(false)
  }

}
