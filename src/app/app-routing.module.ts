import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemsComponent } from './todoitems/todo-items.component';

const routes: Routes = [
  {
    path: 'list',
    component: TodoItemsComponent
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
