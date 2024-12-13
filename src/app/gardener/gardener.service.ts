import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gardener } from '../models/gardener';

@Injectable({
  providedIn: 'root',
})
export class GardenerService {
  private baseUrl = 'http://localhost:5678/webhook/gardener';
  private http = inject(HttpClient);

  // Obter todos os jardineiros
  getGardeners(): Observable<Gardener[]> {
    return this.http.get<Gardener[]>(`${this.baseUrl}/getall`);
  }

  // Criar um novo jardineiro
  createGardener(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  // Atualizar um jardineiro existente
  updateGardener(id: string, data: Partial<Gardener>): Observable<Gardener> {
    return this.http.put<Gardener>(`${this.baseUrl}/update`, { ...data, id });
  }

  // Remover um jardineiro
  deleteGardener(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?id=${id}`);
  }
}
