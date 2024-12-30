import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private storageService: StorageService) {
    this.loadCategories();
  }

  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  addCategory(category: Category): void {
    const currentCategories = this.categories.value;
    if (this.isCategoryNameUnique(category.name)) {
      currentCategories.push(category);
      this.categories.next(currentCategories);
      this.saveCategories();
    } else {
      throw new Error('Category name must be unique');
    }
  }

  updateCategory(updatedCategory: Category): void {
    const currentCategories = this.categories.value;
    const index = currentCategories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1 && this.isCategoryNameUnique(updatedCategory.name, updatedCategory.id)) {
      currentCategories[index] = updatedCategory;
      this.categories.next(currentCategories);
      this.saveCategories();
    } else {
      throw new Error('Category not found or name is not unique');
    }
  }

  deleteCategory(categoryId: string): void {
    const currentCategories = this.categories.value;
    const updatedCategories = currentCategories.filter(category => category.id !== categoryId);
    this.categories.next(updatedCategories);
    this.saveCategories();
  }

  private loadCategories(): void {
    const storedCategories = this.storageService.getData('categories');
    if (storedCategories) {
      this.categories.next(JSON.parse(storedCategories));
    }
  }

  private saveCategories(): void {
    this.storageService.setData('categories', JSON.stringify(this.categories.value));
  }

  private isCategoryNameUnique(name: string, excludeId?: string): boolean {
    return !this.categories.value.some(category =>
      category.name.toLowerCase() === name.toLowerCase() && category.id !== excludeId
    );
  }
}

