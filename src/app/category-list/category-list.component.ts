import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import {CommonModule} from "@angular/common";
import {CategoriesComponent} from "../categories/categories.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {}

  startEditing(category: Category): void {
    this.editingCategory = { ...category };
  }

  cancelEditing(): void {
    this.editingCategory = null;
  }

  saveCategory(category: Category): void {


      this.categoryService.addCategory(category);

    this.editingCategory = null;
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId);
    }
  }
}

