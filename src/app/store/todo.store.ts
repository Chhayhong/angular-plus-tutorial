import { inject, Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { TODO } from '../service/create-todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  db: Firestore = inject(Firestore);
  constructor() { }

  async getDBRef() {
    const todoRef = query(collection(this.db, "todos"))
    return await getDocs(todoRef);
  }

  async addTodo(todo: TODO) {
    const todoRef = doc(this.db, 'todos',todo.id.toString());
    await setDoc(todoRef, todo);
  }

  async deleteTodo(id: string) {
    const todoRef = doc(this.db, 'todos',id);
    await deleteDoc(todoRef);
  }

  async updateTodo(todo: TODO) {
    const todoRef = doc(this.db, 'todos',todo.id);
    await setDoc(todoRef, todo, { merge: true });
  }

}
