import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../clientes-service';

@Component({
  selector: 'app-crear-cliente',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.css',
})
export class CrearCliente implements OnInit {
  private fb = inject(FormBuilder);
  private servicioClientes = inject(ClientesService);
  private router = inject(Router);

  clienteForm: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    direccion: [''],
    esConsumidorFinal: [false]
  });

  ngOnInit(): void {
    // Formulario ya inicializado
  }

  guardar(): void {
    if (this.clienteForm.invalid) return;

    const nuevoCliente = this.clienteForm.value;

    this.servicioClientes.crearCliente(nuevoCliente).subscribe({
      next: () => {
        window.alert('Cliente creado exitosamente.');
        this.router.navigate(['/listarClientes']);
      },
      error: (err: unknown) => {
        console.error('Error al crear el cliente:', err);
        window.alert('No fue posible crear el cliente. Intenta nuevamente.');
      }
    });
  }
}
