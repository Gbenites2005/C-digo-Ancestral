export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  image: string;
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  servings: string;
}

export const dishes: Dish[] = [
  {
    id: 'cangrejo-a-la-plancha',
    name: 'Cangrejo a la plancha',
    description: 'Cangrejo jugoso con ajo, limón y hierbas, perfecto para compartir.',
    price: '$18.90',
    tag: 'Especial del chef',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    ingredients: ['1 kg de cangrejo fresco', '3 ajos finamente picados', 'Jugo de limón', 'Pimienta y sal', 'Hierbas aromáticas', 'Aceite de oliva'],
    steps: ['Limpia y sazona el cangrejo con sal, pimienta y ajo.', 'Calienta la plancha con aceite de oliva y cocina a fuego medio-alto.', 'Añade el cangrejo y cocina 4 a 5 minutos por lado.', 'Termina con limón y hierbas frescas antes de servir.'],
    time: '25 min',
    difficulty: 'Media',
    servings: '2 personas'
  },
  {
    id: 'asado-de-res',
    name: 'Asado de res',
    description: 'Carne tierna con papas doradas, salsa criolla y chimichurri.',
    price: '$16.50',
    tag: 'Sabor intenso',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    ingredients: ['400 g de asado de res', '3 papas medianas', '1 cebolla morada', 'Pimientos', 'Ajo', 'Salsa criolla y chimichurri'],
    steps: ['Sazona la carne con sal, pimienta y ajo.', 'Asa a fuego medio hasta obtener un dorado perfecto.', 'Fríe o hornea las papas hasta dorarlas.', 'Sirve con salsa criolla y chimichurri.'],
    time: '35 min',
    difficulty: 'Media',
    servings: '2 personas'
  },
  {
    id: 'sushi-mixto',
    name: 'Sushi mixto',
    description: 'Variedad de rolls con pescado fresco, aguacate y salsa teriyaki.',
    price: '$17.20',
    tag: 'Frescura premium',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Arroz para sushi', 'Alga nori', 'Salmón picado', 'Aguacate', 'Pepino', 'Salsa teriyaki'],
    steps: ['Cocina el arroz y deja que se temple.', 'Coloca el alga y rellena con los ingredientes elegidos.', 'Enróllalo con ayuda de una esterilla.', 'Córtalo en piezas y acompáñalo con salsa teriyaki.'],
    time: '30 min',
    difficulty: 'Difícil',
    servings: '2 personas'
  },
  {
    id: 'chaulafan',
    name: 'Chaulafán',
    description: 'Arroz con mariscos, cebolla, huevo y especias ecuatorianas.',
    price: '$14.80',
    tag: 'Tradicional',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    ingredients: ['2 tazas de arroz', 'Mariscos cocidos', '1 cebolla picada', '2 huevos', 'Pimentón', 'Especias ecuatorianas'],
    steps: ['Sofríe la cebolla con las especias.', 'Añade el arroz y mezcla con los mariscos.', 'Agrega el huevo y cocina hasta que esté bien integrado.', 'Sirve con limón y perejil fresco.'],
    time: '28 min',
    difficulty: 'Media',
    servings: '2 personas'
  },
  {
    id: 'salchipapa-deluxe',
    name: 'Salchipapa deluxe',
    description: 'Papitas fritas con salchichas, queso, maicitos y salsa secreta.',
    price: '$9.90',
    tag: 'Favorito juvenil',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    ingredients: ['500 g de papas', '2 salchichas', 'Queso rallado', 'Maicitos', 'Salsa secreta', 'Cebollín'],
    steps: ['Fríe las papas hasta dorarlas.', 'Cocina las salchichas a la plancha o en sartén.', 'Arma la base con papas, salchichas y queso.', 'Finaliza con maicitos y salsa secreta.'],
    time: '20 min',
    difficulty: 'Fácil',
    servings: '2 personas'
  },
  {
    id: 'hamburguesa-express',
    name: 'Hamburguesa express',
    description: 'Doble carne, queso fundido, cebolla caramelizada y pan brioche.',
    price: '$13.40',
    tag: 'Street food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    ingredients: ['2 medallones de carne', '2 panes brioche', 'Queso cheddar', 'Cebolla caramelizada', 'Lechuga y tomate', 'Salsas'],
    steps: ['Sazona la carne y cocínala a la parrilla.', 'Tuesta el pan y coloca la cebolla caramelizada.', 'Añade el queso y la carne, y finaliza con verduras.', 'Sirve con salsas al gusto.'],
    time: '18 min',
    difficulty: 'Fácil',
    servings: '2 personas'
  },
  {
    id: 'encebollado',
    name: 'Encebollado',
    description: 'Caldo sabroso con pescado, yuca, cebolla y cilantro.',
    price: '$11.30',
    tag: 'Clásico',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    ingredients: ['300 g de pescado', 'Yuca cocida', 'Cebolla', 'Cilantro', 'Caldo de pescado', 'Jugo de limón'],
    steps: ['Sofríe la cebolla y añade el pescado.', 'Agrega caldo y deja cocinar a fuego medio.', 'Incorpora la yuca y sazona con cilantro.', 'Termina con limón al servir.'],
    time: '26 min',
    difficulty: 'Media',
    servings: '2 personas'
  },
  {
    id: 'bolon-de-queso',
    name: 'Bolón de queso',
    description: 'Bolón dorado, suave por dentro y con queso derretido.',
    price: '$7.50',
    tag: 'Puro sabor',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    ingredients: ['500 g de plátano verde', '200 g de queso fresco', 'Sal', 'Cebolla', 'Aceite'],
    steps: ['Cocina y machaca el plátano verde.', 'Integra queso y forma bolones.', 'Fríe hasta dorar por fuera.', 'Sirve caliente con salsa al gusto.'],
    time: '22 min',
    difficulty: 'Fácil',
    servings: '2 personas'
  },
  {
    id: 'tigrillo',
    name: 'Tigrillo',
    description: 'Bebida energética con frutas exóticas y un toque fresco.',
    price: '$6.20',
    tag: 'Refrescante',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Fruta tropical', 'Jugo de naranja', 'Mango', 'Piña', 'Hielo', 'Agua mineral'],
    steps: ['Licua la fruta con el jugo y agua mineral.', 'Añade hielo y mezcla hasta lograr textura cremosa.', 'Prueba y ajusta dulzor.', 'Sirve en vaso frío.'],
    time: '10 min',
    difficulty: 'Fácil',
    servings: '2 personas'
  },
  {
    id: 'choclisa',
    name: 'Choclisa',
    description: 'Postre irresistible con trozos de chocolate, dulce y cremosa.',
    price: '$5.80',
    tag: 'Para cerrar bien',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Chocolate', 'Crema', 'Dulce de leche', 'Trozos de galleta', 'Nueces'],
    steps: ['Calienta la crema y derrite el chocolate.', 'Añade el dulce de leche y mezcla suavemente.', 'Capa con trozos de galleta y nueces.', 'Refrigera 20 minutos antes de servir.'],
    time: '15 min',
    difficulty: 'Fácil',
    servings: '2 personas'
  }
];

export const getDishById = (dishId: string | null) => dishes.find((dish) => dish.id === dishId) ?? null;
