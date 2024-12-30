import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private storageService: StorageService) {
    this.loadTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Task): void {
    const currentTasks = this.tasks.value;
    currentTasks.push(task);
    this.tasks.next(currentTasks);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasks.value;
    const index = currentTasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      currentTasks[index] = updatedTask;
      this.tasks.next(currentTasks);
      this.saveTasks();
    }
  }

  deleteTask(taskId: string): void {
    const currentTasks = this.tasks.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasks.next(updatedTasks);
    this.saveTasks();
  }

  private loadTasks(): void {
    const storedTasks = this.storageService.getData('tasks');
    if (storedTasks) {
      this.tasks.next(JSON.parse(storedTasks));
    }
  }

  private saveTasks(): void {
    this.storageService.setData('tasks', JSON.stringify(this.tasks.value));
  }
}

