import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {FormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {Category} from "../category.model";


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  @Input() category: Category | null = null;
  @Output() save = new EventEmitter<Category>();
  @Output() cancel = new EventEmitter<void>();

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const category: Category = {
        id: this.category ? this.category.id : Date.now().toString(),
        name: formValue.name
      };
      this.save.emit(category);
      this.categoryForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.categoryForm.reset();
  }
}

