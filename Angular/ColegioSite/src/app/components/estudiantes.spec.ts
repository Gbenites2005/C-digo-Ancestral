import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { EstudiantesComponent } from './estudiantes';
import { CursosService } from '../services/cursos.service';
import { ParalelosService } from '../services/paralelos.service';
import { EstudiantesService } from '../services/estudiantes.service';

describe('EstudiantesComponent', () => {
  let fixture: ComponentFixture<EstudiantesComponent>;
  let component: EstudiantesComponent;

  const paralelosServiceMock = {
    obtenerParalelosPorCurso: jasmine.createSpy('obtenerParalelosPorCurso').and.callFake((idCurso: number) => {
      const paralelos = [
        { idParalelo: 1, nombreParalelo: 'A', idCurso },
        { idParalelo: 2, nombreParalelo: 'B', idCurso }
      ];
      return of(paralelos);
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesComponent],
      providers: [
        { provide: CursosService, useValue: { obtenerCursos: () => of([]) } },
        { provide: ParalelosService, useValue: paralelosServiceMock },
        { provide: EstudiantesService, useValue: { obtenerEstudiantes: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load both parallel options when a course is selected in the filter', fakeAsync(() => {
    component.formularioFiltro.patchValue({ idCurso: 1 });
    tick();

    expect(paralelosServiceMock.obtenerParalelosPorCurso).toHaveBeenCalledWith(1);
    expect(component.paralelos().length).toBe(2);
    expect(component.paralelos().map((p) => p.nombreParalelo)).toEqual(['A', 'B']);
  }));
});
