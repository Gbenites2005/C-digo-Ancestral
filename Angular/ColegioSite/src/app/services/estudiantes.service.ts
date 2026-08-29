import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Estudiante {
  idEstudiante: number;
  nombre: string;
  nombreCurso: string;
  nombreParalelo: string;
  nota1: number;
  nota2: number;
  nota3: number;
  promedio: number;
  estado: string;
}

export interface CrearEstudianteDto {
  nombre: string;
  idCurso: number;
  idParalelo: number;
  nota1: number;
  nota2: number;
  nota3: number;
}

export interface ActualizarEstudianteDto {
  nota1: number;
  nota2: number;
  nota3: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(
      `${this.apiService.getApiUrl()}/api/Estudiantes`
    );
  }

  crearEstudiante(datos: CrearEstudianteDto): Observable<any> {
    return this.http.post(
      `${this.apiService.getApiUrl()}/api/Estudiantes`,
      datos
    );
  }

  actualizarEstudiante(id: number, datos: ActualizarEstudianteDto): Observable<any> {
    return this.http.put(
      `${this.apiService.getApiUrl()}/api/Estudiantes/${id}`,
      datos
    );
  }

  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiService.getApiUrl()}/api/Estudiantes/${id}`
    );
  }
}
