import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GardenerService {
  private baseUrl = 'http://localhost:5678/webhook/gardener';

  constructor(private http: HttpClient) { }

  getGardeners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getall`);
  }

  createGardener(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateGardener(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, { id, ...data });
  }

  deleteGardener(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?id=${id}`);
  }
}
