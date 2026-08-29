import { Component } from '@angular/core';
import { dishes as allDishes, type Dish } from './dishes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'DeliciasExpress';
  selectedDish: Dish | null = null;

  categories = [
    'Cangrejo',
    'Asados',
    'Sushi',
    'Chaulafán',
    'Salchipapa',
    'Hamburguesa',
    'Encebollado',
    'Bolón',
    'Tigrillo',
    'Choclisa'
  ];

  highlights = [
    {
      title: 'Ingredientes frescos',
      text: 'Cada plato se prepara con insumos de calidad y sabor casero.'
    },
    {
      title: 'Sabor auténtico',
      text: 'Combinamos recetas tradicionales con un toque moderno y explosivo.'
    },
    {
      title: 'Servicio rápido',
      text: 'Para que disfrutes tu comida sin esperar y con la mejor atención.'
    }
  ];

  stats = [
    { value: '12+', label: 'años de sazón' },
    { value: '2.4k', label: 'clientes felices' },
    { value: '20 min', label: 'promedio de entrega' },
    { value: '4.9/5', label: 'calificación' }
  ];

  dishes: Dish[] = allDishes;

  openDish(dish: Dish): void {
    this.selectedDish = dish;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeDish(): void {
    this.selectedDish = null;
  }

  get currentDish(): Dish | null {
    return this.selectedDish;
  }
}
