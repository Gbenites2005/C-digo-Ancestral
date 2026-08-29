import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService, type Curso } from '../services/cursos.service';
import { ParalelosService, type Paralelo } from '../services/paralelos.service';
import { EstudiantesService, type Estudiante, type CrearEstudianteDto } from '../services/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class EstudiantesComponent implements OnInit {
  cursos = signal<Curso[]>([]);
  paralelos = signal<Paralelo[]>([]);
  estudiantes = signal<Estudiante[]>([]);
  estudiantesFiltrados = signal<Estudiante[]>([]);
  
  formularioEstudiante: FormGroup;
  formularioFiltro: FormGroup;
  
  modoEdicion = signal(false);
  mostrarFormulario = signal(false);
  estudianteSeleccionado = signal<Estudiante | null>(null);
  
  // Paginación
  paginaActual = signal(1);
  itemsPorPagina = signal(5);
  
  // UI States
  cargando = signal(false);
  error = signal('');
  exito = signal('');

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private paralelosService: ParalelosService,
    private estudiantesService: EstudiantesService
  ) {
    this.formularioEstudiante = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      idCurso: ['', Validators.required],
      idParalelo: ['', Validators.required],
      nota1: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      nota2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      nota3: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.formularioFiltro = this.fb.group({
      idCurso: [''],
      idParalelo: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarEstudiantes();
    
    // Listener para cambios en el curso del filtro
    this.formularioFiltro.get('idCurso')?.valueChanges.subscribe((idCurso) => {
      this.formularioFiltro.patchValue({ idParalelo: '' });

      if (idCurso) {
        this.cargarParalelos(idCurso);
      } else {
        this.paralelos.set([]);
      }

      this.aplicarFiltros();
    });

    // Listener para cambios en paralelo del filtro
    this.formularioFiltro.get('idParalelo')?.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });

    // Listener para cambios en el curso del formulario
    this.formularioEstudiante.get('idCurso')?.valueChanges.subscribe((idCurso) => {
      if (idCurso) {
        this.cargarParalelos(idCurso);
      }
    });
  }

  cargarCursos(): void {
    this.cargando.set(true);
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.error.set('Error al cargar los cursos');
        this.cargando.set(false);
      }
    });
  }

  cargarParalelos(idCurso: number): void {
    this.paralelosService.obtenerParalelosPorCurso(idCurso).subscribe({
      next: (data) => {
        this.paralelos.set(data);
        this.formularioEstudiante.patchValue({ idParalelo: '' });
        this.formularioFiltro.patchValue({ idParalelo: '' });
      },
      error: (err) => {
        console.error('Error cargando paralelos:', err);
        this.error.set('Error al cargar los paralelos');
      }
    });
  }

  cargarEstudiantes(): void {
    this.cargando.set(true);
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes.set(data);
        this.aplicarFiltros();
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando estudiantes:', err);
        this.error.set('Error al cargar los estudiantes');
        this.cargando.set(false);
      }
    });
  }

  aplicarFiltros(): void {
    const idCurso = this.formularioFiltro.get('idCurso')?.value;
    const idParalelo = this.formularioFiltro.get('idParalelo')?.value;
    
    let filtrados = this.estudiantes();

    if (idCurso) {
      const curso = this.cursos().find(c => c.idCurso === parseInt(idCurso));
      if (curso) {
        filtrados = filtrados.filter(e => e.nombreCurso === curso.nombreCurso);
      }
    }

    if (idParalelo) {
      const paralelo = this.paralelos().find(p => p.idParalelo === parseInt(idParalelo));
      if (paralelo) {
        filtrados = filtrados.filter(e => e.nombreParalelo === paralelo.nombreParalelo);
      }
    }

    this.estudiantesFiltrados.set(filtrados);
    this.paginaActual.set(1);
  }

  get estudiantesPaginados(): Estudiante[] {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina();
    const fin = inicio + this.itemsPorPagina();
    return this.estudiantesFiltrados().slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.estudiantesFiltrados().length / this.itemsPorPagina());
  }

  get paginasArray(): number[] {
    const paginas = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  get estudiantesFinalPagina(): number {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina();
    const fin = this.paginaActual() * this.itemsPorPagina();
    return Math.min(fin, this.estudiantesFiltrados().length);
  }

  irAPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual.set(pagina);
    }
  }

  abrirFormulario(): void {
    this.modoEdicion.set(false);
    this.formularioEstudiante.reset();
    this.mostrarFormulario.set(true);
  }

  guardarEstudiante(): void {
    if (this.formularioEstudiante.invalid) {
      this.error.set('Por favor completa todos los campos correctamente');
      return;
    }

    this.cargando.set(true);
    const datos: CrearEstudianteDto = {
      nombre: this.formularioEstudiante.get('nombre')?.value,
      idCurso: parseInt(this.formularioEstudiante.get('idCurso')?.value),
      idParalelo: parseInt(this.formularioEstudiante.get('idParalelo')?.value),
      nota1: parseFloat(this.formularioEstudiante.get('nota1')?.value),
      nota2: parseFloat(this.formularioEstudiante.get('nota2')?.value),
      nota3: parseFloat(this.formularioEstudiante.get('nota3')?.value)
    };

    this.estudiantesService.crearEstudiante(datos).subscribe({
      next: () => {
        this.exito.set('Estudiante creado exitosamente');
        this.mostrarFormulario.set(false);
        this.cargarEstudiantes();
        this.cargando.set(false);
        setTimeout(() => this.exito.set(''), 3000);
      },
      error: (err) => {
        console.error('Error creando estudiante:', err);
        this.error.set('Error al crear el estudiante');
        this.cargando.set(false);
      }
    });
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.modoEdicion.set(true);
    this.estudianteSeleccionado.set(estudiante);
    this.formularioEstudiante.patchValue({
      nota1: estudiante.nota1,
      nota2: estudiante.nota2,
      nota3: estudiante.nota3
    });
    this.mostrarFormulario.set(true);
  }

  actualizarEstudiante(): void {
    if (this.formularioEstudiante.get('nota1')?.invalid ||
        this.formularioEstudiante.get('nota2')?.invalid ||
        this.formularioEstudiante.get('nota3')?.invalid) {
      this.error.set('Por favor ingresa notas válidas entre 0 y 10');
      return;
    }

    const estudiante = this.estudianteSeleccionado();
    if (!estudiante) return;

    this.cargando.set(true);
    const datos = {
      nota1: parseFloat(this.formularioEstudiante.get('nota1')?.value),
      nota2: parseFloat(this.formularioEstudiante.get('nota2')?.value),
      nota3: parseFloat(this.formularioEstudiante.get('nota3')?.value)
    };

    this.estudiantesService.actualizarEstudiante(estudiante.idEstudiante, datos).subscribe({
      next: () => {
        this.exito.set('Estudiante actualizado exitosamente');
        this.mostrarFormulario.set(false);
        this.cargarEstudiantes();
        this.cargando.set(false);
        setTimeout(() => this.exito.set(''), 3000);
      },
      error: (err) => {
        console.error('Error actualizando estudiante:', err);
        this.error.set('Error al actualizar el estudiante');
        this.cargando.set(false);
      }
    });
  }

  abrirDialogoEliminar(estudiante: Estudiante): void {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${estudiante.nombre}?`);
    if (confirmacion) {
      this.eliminarEstudiante(estudiante);
    }
  }

  eliminarEstudiante(estudiante: Estudiante): void {
    this.cargando.set(true);
    this.estudiantesService.eliminarEstudiante(estudiante.idEstudiante).subscribe({
      next: () => {
        this.exito.set('Estudiante eliminado exitosamente');
        this.cargarEstudiantes();
        this.cargando.set(false);
        setTimeout(() => this.exito.set(''), 3000);
      },
      error: (err) => {
        console.error('Error eliminando estudiante:', err);
        this.error.set('Error al eliminar el estudiante');
        this.cargando.set(false);
      }
    });
  }

  cancelarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.modoEdicion.set(false);
    this.estudianteSeleccionado.set(null);
    this.formularioEstudiante.reset();
  }

  limpiarMensaje(): void {
    this.error.set('');
    this.exito.set('');
  }
}
