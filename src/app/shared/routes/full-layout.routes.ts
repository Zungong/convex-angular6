import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
// Currently there are two main urls on our Angular application
export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'secondary',
    loadChildren: './secondary/secondary.module#SecondaryModule'
  }
];