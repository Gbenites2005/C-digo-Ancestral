import { Routes } from '@angular/router';
import { Listarproductos } from './productos/listarproductos/listarproductos';
import { Editarproductos } from './productos/editarproductos/editarproductos';
import { CrearProducto } from './productos/crear-producto/crear-producto';
import { ListarClientes } from './clientes/listar-clientes/listar-clientes';
import { EditarCliente } from './clientes/editar-cliente/editar-cliente';
import { CrearCliente } from './clientes/crear-cliente/crear-cliente';
import { PaginaNoEncontrada } from './pagina-no-encontrada/pagina-no-encontrada';

export const routes: Routes = [
  { path: '', redirectTo: 'listarProductos', pathMatch: 'full' },
  { path: 'listarProductos', component: Listarproductos },
  { path: 'editarProductos/:id', component: Editarproductos },
  { path: 'crearProducto', component: CrearProducto },
  { path: 'listarClientes', component: ListarClientes },
  { path: 'editarCliente/:id', component: EditarCliente },
  { path: 'crearCliente', component: CrearCliente },
  { path: 'paginaNoEncontrada', component: PaginaNoEncontrada },
  { path: '**', redirectTo: 'paginaNoEncontrada' }
];