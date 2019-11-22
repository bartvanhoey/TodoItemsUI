import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { TodoItemsService } from './shared/todo-items.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-todoitems',
  templateUrl: './todo-items.component.html',
  providers: [ConfirmationService]
})
export class TodoItemsComponent implements OnInit {
  @ViewChild('todoItemForm', { static: false }) public todoItemForm: NgForm;
  createEditDisplay = false;
  todoItems: TodoItem[] = [];
  todoItemId = -1;
  todoItem: TodoItem = new TodoItem();
  constructor(private todoItemsService: TodoItemsService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getTodoItems();
  }

  showCreateEditTodoItemDialog(id?: number) {
    (id === undefined) ? this.todoItemId = -1 : this.todoItemId = id;
    if (this.todoItemId > -1) {
      this.todoItem = this.todoItemsService.getTodoItemFromList(this.todoItemId, this.todoItems);
    }
    this.createEditDisplay = true;
  }

  showDeleteTodoItemDialog(id: number) {
    this.todoItem = this.todoItemsService.getTodoItemFromList(id, this.todoItems);
    if (this.todoItem) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.todoItemsService.deleteTodoItem(id).subscribe(() => {
            this.getTodoItems();
            this.todoItem = new TodoItem();
          });
        },
        reject: () => {
          console.log('delete rejected');
        }
      });
    }
  }

  closeCreateEditTodoItemDialog() {
    this.todoItem = new TodoItem();
  }
  saveTodoItem(): void {
    this.todoItemsService.saveTodoItem(this.todoItem).subscribe(() => {
      this.todoItemForm.reset();
      this.getTodoItems();
      this.createEditDisplay = false;
    });
  }

  getTodoItems() {
    return this.todoItemsService.getTodoItems().subscribe(todoItems => {
      this.todoItems = [...todoItems];
    });
  }
}
