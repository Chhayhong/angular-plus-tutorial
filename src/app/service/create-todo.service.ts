import { inject, Injectable, signal } from '@angular/core';
import { TodoStore } from '../store/todo.store';
import { v4 as uuidv4 } from 'uuid';

export interface TODO {
  id: string;
  name: string;
  completed: boolean
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private dataStore = inject(TodoStore)
  public todos = signal<TODO[]>([])
  public isLoading = signal<boolean>(false);

  async getTodo() {
    this.isLoading.set(true)
    await this.dataStore.getDBRef().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.todos.update((currentTodos) => [
          ...currentTodos,
          doc.data() as TODO
        ])
      });
    }).finally(() => this.isLoading.set(false))
    return this.todos()
  }

  getTodoId() {
    return uuidv4()
  }

  addTodo(newTodo: TODO) {
    this.isLoading.set(true)
    this.dataStore.addTodo(newTodo).then(() => {
      this.todos.update((currentTodos) => [...currentTodos, newTodo])
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .finally(() => this.isLoading.set(false))
  }

  deleteTodo(id: string) {
    this.isLoading.set(true)
    this.dataStore.deleteTodo(id).then(() => {
      this.todos.update((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id))
    }).catch((error) => {
      console.error("Error removing document: ", error);
    })
      .finally(() => this.isLoading.set(false))
  }

  updateTodo(updatedTodo: TODO) {
    this.isLoading.set(true)
    this.dataStore.updateTodo(updatedTodo).then(() => {
      this.todos.update((currentTodos) =>
        currentTodos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo))
    }).catch((error) => {
      console.error("Error updating document: ", error);
    })
      .finally(() => this.isLoading.set(false))
  }

}
