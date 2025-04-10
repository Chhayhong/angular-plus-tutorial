import {ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TODO } from '../../service/create-todo.service';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-card',
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule,MatButtonModule,
    MatIconModule
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TodoCardComponent implements OnInit {
  @Input() todo:TODO | null= null
  @Output() deleteTodo = new EventEmitter();
  @Output() updateTodo = new EventEmitter();
  @Output() completeTodo = new EventEmitter();

   constructor(){
   } 

  private readonly _formBuilder = inject(FormBuilder);

  todoForm:FormGroup | undefined;

  ngOnInit(){
    this.todoForm = this._formBuilder.group({
      completed: this.todo?.completed,
      name: this.todo?.name,
      id: this.todo?.id
    });

    this.todoForm?.valueChanges.subscribe((value)=>{
      this.completeTodo.emit(value)
    })
  }
}
