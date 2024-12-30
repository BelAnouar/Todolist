import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { Category } from '../category.model';
import { TaskService } from '../task.service';
import { CategoryService } from '../category.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tasts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasts.component.html',
  styleUrl: './tasts.component.css'
})
export class TastsComponent implements OnInit {
  taskForm: FormGroup;
  categories$: Observable<Category[]>;
  isEditMode: boolean = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    protected router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      dueDate: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['not-started', Validators.required],
      categoryId: ['', Validators.required]
    });
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        id: this.isEditMode ? this.taskId! : Date.now().toString(),
        ...formValue,
        dueDate: new Date(formValue.dueDate)
      };

      if (this.isEditMode) {
        this.taskService.updateTask(task);
      } else {
        this.taskService.addTask(task);
      }

      this.router.navigate(['/tasks']);
    }
  }

  private loadTask(taskId: string): void {
    this.taskService.getTasks().subscribe(tasks => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        this.taskForm.patchValue({
          ...task,
          dueDate: this.formatDate(task.dueDate)
        });
      }
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

