                                                                                                                                                                                                                                                                                                                                            import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

export interface Cliente {
  clienteId: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad?: string;
  esConsumidorFinal?: boolean;
  fechaCreacion: string;
}

interface RespuestaClientes {
  value: Cliente[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
  private urlbase = 'http://facturacion-api.runasp.net/api/Clientes';

  obtenerTodosLosClientes(): Observable<Cliente[]> {
    return this.http
      .get<RespuestaClientes | Cliente[]>(this.urlbase)
      .pipe(
        map((respuesta) => {
          console.log('Respuesta de API (clientes):', respuesta);
          const datos = Array.isArray(respuesta) ? respuesta : respuesta.value;
          console.log('Datos procesados:', datos);
          return datos;
        })
      );
  }

  obtenerClientePorId(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlbase}/${clienteId}`).pipe(
      catchError(() => {
        // Si el endpoint individual no existe, obtener todos y buscar el específico
        console.warn('El endpoint GET /:id no disponible, obteniendo todos los clientes...');
        return this.obtenerTodosLosClientes().pipe(
          map(clientes => {
            const encontrado = clientes.find(c => c.clienteId === clienteId);
            if (!encontrado) {
              throw new Error(`Cliente con ID ${clienteId} no encontrado`);
            }
            return encontrado;
          })
        );
      })
    );
  }

  crearCliente(cliente: Omit<Cliente, 'clienteId'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlbase, cliente);
  }

  actualizarCliente(clienteId: number, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.urlbase}/${clienteId}`, cliente);
  }

  eliminarCliente(clienteId: number): Observable<void> {
    return this.http.delete<void>(`${this.urlbase}/${clienteId}`).pipe(
      catchError((error) => {
        console.error('Error en eliminarCliente:', error);
        console.log('Status:', error.status);
        console.log('Message:', error.message);
        return throwError(() => error);
      })
    );
  }
}
