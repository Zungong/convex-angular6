import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SecondaryComponent } from './secondary.component';
import { SecondaryRoutingModule } from './secondary-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Module for Secondary Dashboard
@NgModule({
  imports: [
    CommonModule,
    SecondaryRoutingModule,
    NgbModule,
    NgxDatatableModule
  ],
  declarations: [SecondaryComponent]
})
export class SecondaryModule { }
