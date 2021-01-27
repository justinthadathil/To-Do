import { CdkDragDrop, CdkDragHandle, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import{Task} from './task/task';
import {MatDialog} from '@angular/material/dialog';
import{TaskDialogComponent} from './task-dialog/task-dialog.component';
import {TaskDialogResult} from './task-dialog/task-dialog.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: Task[] = [
    {
      title:'Buy Milk',
      description:'go to store',
    },
    {
      title:'Buy cloths',
      description:'go to cloth shop',
    },
  ];
  inProgress: Task[]=[];
  done: Task[]=[];

  constructor(private dialog: MatDialog){

  }

  drop(event: CdkDragDrop<Task[]>): void{
    if(event.previousContainer === event.container){
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  edit(list: string, task:Task): void {

  }

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data:{
        task:{}
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }
}
