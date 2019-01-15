import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAPIService {

  constructor(private http: HttpClient) { }

  // below functions submit GET request to server to fetch proper information or list
  getServerCounts() {
    return this.http.get<any>('/api/serverinfo/counts');
  }

  getServerByStatus() {
    return this.http.get<any>('/api/serverinfo/bystatus');
  }

  getServerByFinStatus() {
    return this.http.get<any>('/api/serverinfo/byfinstatus');
  }

  getServerExpireList() {
    return this.http.get<any>('/api/serverinfo/expirelist');
  }

  getServerList(server_status: string) {
    return this.http.get<any>('/api/serverinfo/list', { params: {'status': server_status }});
  }

  getCategoryList() {
    return this.http.get<any>('/api/category/list');
  }

  getApplicationList(category: string) {
    return this.http.get<any>('/api/application/list', { params: {'category': category }});
  }

  getServerinfoByModel(model: string) {
    return this.http.get<any>('/api/serverinfo/bymodel', { params: {'model': model }});
  }
}
