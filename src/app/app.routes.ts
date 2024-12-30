import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryListComponent} from "./category-list/category-list.component";

const routeConfig: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Home page'
  },
  {
    path: 'category',
    component: CategoryListComponent,
    title: 'Home details'
  }
];

export default routeConfig;
