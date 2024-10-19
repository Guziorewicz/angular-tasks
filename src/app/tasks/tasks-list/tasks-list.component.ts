import { Component, computed, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../tasks.service';
import { tasksStatusOptionsProvider} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [tasksStatusOptionsProvider],
})
export class TasksListComponent {

  
  constructor(private tasksService: TasksService){
    this.tasksService.loadTasks();
   }
  selectedFilter = signal<string>('all'); // signal property for filter with default value

  tasks = computed(()=> {
    switch(this.selectedFilter()) {
      case 'All':
        return this.tasksService.allTasks();
        case 'open':
          return this.tasksService.allTasks().filter(task => task.status === 'OPEN');
        case 'in-progress':
          return this.tasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
        case 'done':
          return this.tasksService.allTasks().filter(task => task.status === 'DONE');
        default:
          return this.tasksService.allTasks();          
    }
  })


  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
