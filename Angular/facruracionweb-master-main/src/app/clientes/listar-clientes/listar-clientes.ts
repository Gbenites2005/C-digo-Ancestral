import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente, ClientesService } from '../clientes-service';

@Component({
  selector: 'app-listar-clientes',
  imports: [MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.css',
})
export class ListarClientes implements OnInit {
  displayedColumns: string[] = [
    'nombres', 'apellidos', 'cedula', 'email', 'telefono', 
    'direccion', 'clienteId', 'acciones',
  ];
  dataSource = new MatTableDataSource<Cliente>();

  private servicioClientes = inject(ClientesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.servicioClientes.obtenerTodosLosClientes().subscribe({
      next: (respuesta) => {
        console.log('Clientes recibidos en componente:', respuesta);
        if (respuesta && respuesta.length > 0) {
          console.log('Primer cliente:', respuesta[0]);
          console.log('Campos disponibles:', Object.keys(respuesta[0]));
        }
        this.dataSource.data = respuesta;
      },
      error: (error) => {
        console.error('Error al obtener los clientes:', error);
        window.alert('No fue posible cargar los clientes.');
      },
    });
  }

  crearCliente(): void {
    this.router.navigate(['/crearCliente']);
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/editarCliente', cliente.clienteId]);
  }

  eliminarCliente(cliente: Cliente): void {
    if (!window.confirm(`¿Eliminar al cliente "${cliente.nombres} ${cliente.apellidos}"?`)) return;

    this.servicioClientes.eliminarCliente(cliente.clienteId).subscribe({
      next: () => {
        window.alert('Cliente eliminado exitosamente.');
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.clienteId !== cliente.clienteId,
        );
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
        console.log('Status del error:', error.status);
        console.log('Mensaje del error:', error.message);
        window.alert('No fue posible eliminar el cliente. Intenta nuevamente.');
      },
    });
  }
}
