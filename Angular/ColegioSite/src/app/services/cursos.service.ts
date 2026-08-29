import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Curso {
  idCurso: number;
  nombreCurso: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `${this.apiService.getApiUrl()}/api/Cursos`
    );
  }
}
