import IndexController from './controller/IndexController.js';
import IndexModel from './model/IndexModel.js';
import MovieModel from './model/MovieModel.js';
import IndexView from './view/IndexView.js';
import MovieView from './view/MoviesView.js';
import MenuView from './view/MenuView.js';
// Crear instancias de los modelos y vistas
const indexModel = new IndexModel();
const movieModel = new MovieModel([]);
const indexView = new IndexView();
const movieView = new MovieView(movieModel);
// Crear el controlador
const indexController = new IndexController(indexView, indexModel, movieModel, movieView);
// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar el controlador
    indexController.init();
    // Iniciar el render del menú
    const menuView = new MenuView();
    menuView.render();
    // Lógica para actualizar constantemente la aplicación
    const updateInterval = 1000; // Intervalo de actualización en milisegundos
    setInterval(() => {
    }, updateInterval);
});
/*
document.addEventListener('DOMContentLoaded', () => {
    const indexController = new IndexController(indexView, indexModel, movieModel, movieView);
    indexController.init();
});
*/
