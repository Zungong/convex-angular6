import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondaryComponent } from "./secondary.component";

// last url part will be indicate server model type, and we render secondary dashboard page for those
const routes: Routes = [
    {
        path: ':modeltype',
        component: SecondaryComponent,
        data: {
         title: 'Secondary Dashboard'
       },
    }
];

// Register the above rule to Angular Router Module
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
// Declare Dashboard Routing Class
export class SecondaryRoutingModule { }
