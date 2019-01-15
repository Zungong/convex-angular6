
// Below constants are to initiate the two pie charts
// Pie
export var serverStatusChartLabels: string[] = ['UP', 'DOWN', 'WARNING'];
export var serverStatusChartData: number[] = [1, 1, 1];
export var serverStatusChartType = 'pie';
export var serverStatusChartColors: any[] = [{ backgroundColor: ["rgba(40, 208, 148, 1)", "#FF4961", "#FF9149"] }];
export var serverStatusChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};

export var collectionStatusChartLabels: string[] = ['ACTIVO', 'BAJA', 'SUSPENDIDO', 'VENCIDO'];
export var collectionStatusChartData: number[] = [1, 1, 1, 1];
export var collectionStatusChartType = 'pie';
export var collectionStatusChartColors: any[] = [{ backgroundColor: ["rgba(30, 159, 242, 1)", "#FF4961", "rgba(102, 110, 232, 1)", "#FF9149"] }];
export var collectionStatusChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};
