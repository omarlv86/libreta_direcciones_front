import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://libreta_direcciones_backend.test/api';

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud GET
  getDatos(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts?page=${page}`);
  }

  // Método para realizar una solicitud POST
  postDatos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, data);
  }

  getDataFilter(filter: any): any {
    return this.http.post<any>(`${this.apiUrl}/contacts/filter`, {filter});
  }

  getDataById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts/${id}`);
  }

  deleteContact(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contacts/${id}`);
  }

  createContact(data:any, id?:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, data);
  }
  
}
