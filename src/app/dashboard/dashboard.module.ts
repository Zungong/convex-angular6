import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Module for Main Dashboard
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    ChartsModule,
    NgxDatatableModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
