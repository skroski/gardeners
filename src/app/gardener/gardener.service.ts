import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gardener } from '../models/gardener';

@Injectable({
  providedIn: 'root',
})
export class GardenerService {
  private baseUrl = 'https://n8n.duplod.com.br/webhook/gardener';
  private baseUrlWebHook = 'https://webhook.duplod.com.br/webhook/gardener';
  private http = inject(HttpClient);

  // Obter todos os jardineiros
  getGardeners(): Observable<Gardener[]> {
    return this.http.get<Gardener[]>(`${this.baseUrl}/getall`);
  }

  // Criar um novo jardineiro
  createGardener(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlWebHook}/create`, data);
  }
  //https://webhook.duplod.com.br/webhook/gardener/create
  // Atualizar um jardineiro existente
  updateGardener(id: string, data: Partial<Gardener>): Observable<Gardener> {
    return this.http.put<Gardener>(`${this.baseUrl}/update`, { ...data, id });
  }

  // Remover um jardineiro
  deleteGardener(id: any): Observable<void> {
    debugger;
    console.log(`${this.baseUrlWebHook}/delete?id=${id}`);
    return this.http.delete<void>(`${this.baseUrlWebHook}/delete/=${id}`);
  }
}
