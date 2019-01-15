import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAPIService } from '../my-api.service'
import { MonitorDbService } from '../monitor-db.service'
import { BaseChartDirective } from 'ng2-charts';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import * as chartsData from '../shared/data/chartjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Left Pie Chart parameters for Server Status
  public serverStatusChartLabels = chartsData.serverStatusChartLabels;
  public serverStatusChartData = chartsData.serverStatusChartData;
  public serverStatusChartType = chartsData.serverStatusChartType;
  public serverStatusChartColors = chartsData.serverStatusChartColors;
  public serverStatusChartOptions = chartsData.serverStatusChartOptions;
  // Right Pie Chart parameters for Server Finance Status
  public collectionStatusChartLabels = chartsData.collectionStatusChartLabels;
  public collectionStatusChartData = chartsData.collectionStatusChartData;
  public collectionStatusChartType = chartsData.collectionStatusChartType;
  public collectionStatusChartColors = chartsData.collectionStatusChartColors;
  public collectionStatusChartOptions = chartsData.collectionStatusChartOptions;

  countServer; // Total de Servidores
  countUser; // Total de Usuarios
  countDB; // Total de BDs
  expireList: any[]; // Expirations
  serverList: any[]; // Resumen de Servidores por Estatus
  public appList = { counts: [], list: []}; // Aplicaciones Instaladas
  public clickedStatus = ''; // currently clicked pie section

  @ViewChild("chart1") chart1: BaseChartDirective; // Estatus de Servidores
  @ViewChild("chart2") chart2: BaseChartDirective; // Estatus de Cobranza
  @ViewChild(DatatableComponent) table: DatatableComponent; // Lista de Vencimientos

  // Inject our API service and DB monitoring service
  constructor(private api: MyAPIService, private db_service: MonitorDbService) { }

  ngOnInit() {
    // if server sends db changed message, we refresh the chart and table
    this.db_service.messages.subscribe(msg => {
      this.refreshData(); 
      console.log(msg);
    });
    // fetch server counts from server
    this.api.getServerCounts().subscribe(res => {
      if (res.status == 200) {
        this.countServer = res.response[0].server_cnt;
        this.countUser = res.response[0].total_users;
        this.countDB = res.response[0].total_dbs;
      } else {
        alert(res.error);
      }
    });
    // fetch server expire list from server
    this.api.getServerExpireList().subscribe(res => {
      if (res.status == 200) {
        this.expireList = res.response;
      } else {
        alert(res.error);
      }
    });
    // fetch CONTPAQi application list from server
    this.changeCategory('CONTPAQi');
    // refresh the chart and server info table
    this.refreshData();
  }

  ngOnDestroy() {
  }

  public refreshData(): void {
    // refresh server status chart pie
    this.api.getServerByStatus().subscribe(res => {
      if (res.status == 200) {
        res.response.forEach(element => {
          if (element.ServerStatus == "UP")
            this.serverStatusChartData[0] = element.cnt;
          else if (element.ServerStatus == "DOWN")
            this.serverStatusChartData[1] = element.cnt;
          else if (element.ServerStatus == "WARNING")
            this.serverStatusChartData[2] = element.cnt;
        });
        this.chart1.chart.update();
      } else {
        alert(res.error);
      }
    });
    // refresh server finance status chart pie
    this.api.getServerByFinStatus().subscribe(res => {
      if (res.status == 200) {
        res.response.forEach(element => {
          if (element.FinanceStatus == "ACTIVO")
            this.collectionStatusChartData[0] = element.cnt;
          else if (element.FinanceStatus == "BAJA")
            this.collectionStatusChartData[1] = element.cnt;
          else if (element.FinanceStatus == "SUSPENDIDO")
            this.collectionStatusChartData[2] = element.cnt;
          else if (element.FinanceStatus == "VENCIDO")
            this.collectionStatusChartData[3] = element.cnt;
        });
        this.chart2.chart.update();
      } else {
        alert(res.error);
      }
    });
    // refresh server list
    this.api.getServerList(this.clickedStatus).subscribe(res => {
      if (res.status == 200) {
        this.serverList = res.response;
      } else {
        alert(res.error);
      }
    });
  }

  // events
  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        //console.log(clickedElementIndex, label, value);
        this.clickedStatus = label;
        // get clicked status server list
        this.api.getServerList(this.clickedStatus).subscribe(res => {
          if (res.status == 200) {
            this.serverList = res.response;
          } else {
            alert(res.error);
          }
        });
      }
    }
  }

  public chartHovered(e: any): void {
    //your code here
  }

  public clearFilter(): void {
    this.clickedStatus = '';
    // reset status flag and fetch all server list
    this.api.getServerList(this.clickedStatus).subscribe(res => {
      if (res.status == 200) {
        this.serverList = res.response;
      } else {
        alert(res.error);
      }
    });
  }

  public changeCategory(category: string): void {
    // when category select box changed, fetch proper application list from server
    this.api.getApplicationList(category).subscribe(res => {
      if (res.status == 200) {
        this.appList = res.response;
      } else {
        alert(res.error);
      }
    });
  }

}
