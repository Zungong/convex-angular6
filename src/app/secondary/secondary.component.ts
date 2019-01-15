import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAPIService } from '../my-api.service'
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.scss']
})
export class SecondaryComponent implements OnInit {

  modelType$: string; // model type of currently showing page
  rows: any[] = []; // Lista de Servidores Virtuales
  temp: any[] = []; // temporary variable for filtering Lista de Servidores Virtuales
  selected: any[] = []; // temporary variable for making the table selectable
  columns: any[] = [ // Columns of Lista de Servidores Virtuales table
    { prop: 'ServerID', name: 'Server ID', width: 10 },
    { prop: 'Name', name: 'Name' }
  ];

  public selectedRow = {}; // current selected row in Lista de Servidores Virtuales table
  public serverIdGroup = {}; // server list grouped by same Server ID

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: MyAPIService
  ) {
    route.params.subscribe(val => {
      // this enters when url is changed between same component
      // get model type routing parameter
      this.modelType$ = this.route.snapshot.paramMap.get('modeltype');
      this.selectedRow = {};
      // fetch server list by model
      this.api.getServerinfoByModel(this.modelType$).subscribe(res => {
        if (res.status == 200) {
          // initialize grouped list
          this.serverIdGroup = {};
          this.temp.length = 0;
          // iterate response and group by same Server ID to collect the applications with same ServerID
          res.response.forEach(element => {
            if (element.ServerID) {
              if (this.serverIdGroup[element.ServerID]) {
                // if already know ServerID is detected before simply adds it group list
                this.serverIdGroup[element.ServerID].push(element);
              } else {
                // if ServerID is new, calculate disc usage percentage first and add it as first and only element in group
                element.DiskUsage = parseInt(element.DD);
                if (element.DD.toLowerCase().indexOf('tb') !== -1) {
                  element.DiskUsage *= 1024;
                }
                element.DiskUsage = (element.DiskUsage - element.DiskFreeSpace) / element.DiskUsage * 100;
                this.temp.push(element);
                this.serverIdGroup[element.ServerID] = [];
                this.serverIdGroup[element.ServerID].push(element);
              }
            }
          });
          // by changing rows directly, trigger datatable redraw
          this.rows = [...this.temp];
        } else {
          alert(res.error);
        }
      });
    });
  }

  ngOnInit() {
    // make selected message hidden
    this.table.messages.selectedMessage = null;
  }

  //  On select of dataTable's data row
  onSelect(event) {
    if (event.selected.length > 0) {
      this.selectedRow = event.selected[0];
    }
  }

  //  On Activation of dataTable's data row
  onActivate(event) {
    //your code here
  }

  updateFilter(event) {
    // on key change event, search the table with same name
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
        return d.Name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
