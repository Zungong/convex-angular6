import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard.component";

// Blank urls will be redirected to Main Dashboard page
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
         title: 'Main Dashboard'
       },
    }
];

// Register the above rule to Angular Router Module
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
// Declare Dashboard Routing Class
export class DashboardRoutingModule { }
