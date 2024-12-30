import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  standalone: true,
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], searchTerm: string): Task[] {
    if (!tasks || !searchTerm) {
      return tasks;
    }

    searchTerm = searchTerm.toLowerCase();

    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      (task.description && task.description.toLowerCase().includes(searchTerm)) ||
      task.priority.toLowerCase().includes(searchTerm) ||
      task.status.toLowerCase().includes(searchTerm)
    );
  }
}

