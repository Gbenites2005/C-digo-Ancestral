import { Routes } from '@angular/router';
import { EstudiantesComponent } from './components/estudiantes';

export const routes: Routes = [
  {
    path: '',
    component: EstudiantesComponent
  },
  {
    path: 'estudiantes',
    component: EstudiantesComponent
  }
];
