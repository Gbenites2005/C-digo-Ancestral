import { Component, Input, inject, OnInit, numberAttribute } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Cliente, ClientesService } from '../clientes-service';

@Component({
  selector: 'app-editar-cliente',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.html',
  styleUrl: './editar-cliente.css',
})
export class EditarCliente implements OnInit {
  @Input({ transform: numberAttribute }) id!: number;

  private fb = inject(FormBuilder);
  private servicioClientes = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  clienteId!: number;

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
    this.clienteId = this.id || Number(this.route.snapshot.paramMap.get('id'));

    if (this.clienteId) {
      this.servicioClientes.obtenerClientePorId(this.clienteId).subscribe({
        next: (cliente) => this.clienteForm.patchValue(cliente),
        error: (err: unknown) => {
          console.error('Error al cargar el cliente:', err);
          window.alert('No fue posible cargar el cliente. Intenta nuevamente.');
          this.router.navigate(['/listarClientes']);
        }
      });
    }
  }

  guardar(): void {
    if (this.clienteForm.invalid) return;

    const clienteEditado: Cliente = {
      clienteId: this.clienteId,
      ...this.clienteForm.value
    };

    this.servicioClientes.actualizarCliente(this.clienteId, clienteEditado).subscribe({
      next: () => {
        window.alert('Cliente actualizado exitosamente.');
        this.router.navigate(['/listarClientes']);
      },
      error: (err: unknown) => {
        console.error('Error al actualizar el cliente:', err);
        window.alert('No fue posible actualizar el cliente. Intenta nuevamente.');
      }
    });
  }
}
