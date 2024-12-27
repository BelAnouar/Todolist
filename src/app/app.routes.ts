import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoriesComponent} from "./categories/categories.component";

const routeConfig: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Home page'
  },
  {
    path: 'cat',
    component: CategoriesComponent,
    title: 'Home details'
  }
];

export default routeConfig;
