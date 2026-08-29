import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Paralelo {
  idParalelo: number;
  nombreParalelo: string;
  idCurso: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParalelosService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  obtenerParalelosPorCurso(idCurso: number): Observable<Paralelo[]> {
    return this.http.get<Paralelo[]>(
      `${this.apiService.getApiUrl()}/api/Paralelos?idCurso=${idCurso}`
    );
  }
}
