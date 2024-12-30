import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FilterTasksPipe} from "../pipes/filter-tasks.pipe";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule, RouterLink, FormsModule, FilterTasksPipe],
  standalone: true,
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  categories$: BehaviorSubject<Category[]>;
  searchTerm: string = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
    this.tasks$ = this.taskService.getTasks();
    this.categories$ = new BehaviorSubject<Category[]>([]);
    this.categoryService.getCategories().subscribe(categories => {
      this.categories$.next(categories);
    });
  }

  ngOnInit(): void {}

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  updateTaskStatus(task: Task, status: 'completed' | 'in-progress' | 'not-started'): void {
    const updatedTask = { ...task, status };
    this.taskService.updateTask(updatedTask);
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories$.value.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  }
}

