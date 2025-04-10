import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TODO, TodoService } from '../service/create-todo.service';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { TodoCardComponent } from '../shared/todo-card/todo-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-display-todo',
  imports: [MatListModule,MatDivider,TodoCardComponent,MatProgressSpinnerModule],
  templateUrl: './display-todo.component.html',
  styleUrl: './display-todo.component.scss'
})
export class DisplayTodoComponent implements OnInit {
  private todoService = inject(TodoService)
  @Output() updateTodo = new EventEmitter();
  protected todos:TODO[]=[];
  protected isLoading =false

  constructor(){  
    effect(()=>{
      this.todos = this.todoService.todos()
      this.isLoading= this.todoService.isLoading()
    })
  }

  ngOnInit(){
    this.todoService.getTodo()
  }

  onCompleted(todo:TODO){
    this.todoService.updateTodo(todo)
  }

  onUpdateValue(todo:TODO){
    this.updateTodo.emit(todo)
  }

  onDelete(id:string){
    
    this.todoService.deleteTodo(id)
  }
}
