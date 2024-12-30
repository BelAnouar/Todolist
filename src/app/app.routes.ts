import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {TastsComponent} from "./tasts/tasts.component";

const routeConfig: Routes = [

  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TastsComponent },
  { path: 'tasks/edit/:id', component: TastsComponent },
  { path: 'categories', component: CategoryListComponent },
];

export default routeConfig;
