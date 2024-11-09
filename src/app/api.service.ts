import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://libreta_direcciones_backend.test/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud GET
  getDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts`);
  }

  // Método para realizar una solicitud POST
  postDatos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contacts`, data);
  }

  // Puedes agregar más métodos para PUT, DELETE, etc.
}
