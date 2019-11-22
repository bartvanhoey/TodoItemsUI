import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TodoItemsComponent } from './todoitems/todo-items.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TodoItemsService } from './todoitems/shared/todo-items.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [TodoItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
