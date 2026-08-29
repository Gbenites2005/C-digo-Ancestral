import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductosService } from '../productos-service';

@Component({
  selector: 'app-crear-producto',
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
})
export class CrearProducto implements OnInit {
  private fb = inject(FormBuilder);
  private servicioProductos = inject(ProductosService);
  private router = inject(Router);

  productoForm: FormGroup = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: [''],
    precioUnitario: [0, [Validators.required, Validators.min(0)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    activo: [true]
  });

  ngOnInit(): void {
    // Formulario ya inicializado
  }

  guardar(): void {
    if (this.productoForm.invalid) return;

    const nuevoProducto = this.productoForm.value;

    this.servicioProductos.crearProducto(nuevoProducto).subscribe({
      next: () => {
        window.alert('Producto creado exitosamente.');
        this.router.navigate(['/listarProductos']);
      },
      error: (err: unknown) => {
        console.error('Error al crear el producto:', err);
        window.alert('No fue posible crear el producto. Intenta nuevamente.');
      }
    });
  }
}
