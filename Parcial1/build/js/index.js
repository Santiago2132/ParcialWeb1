import IndexController from './controller/IndexController.js';
import IndexModel from './model/IndexModel.js';
import MovieModel from './model/MovieModel.js';
import IndexView from './view/IndexView.js';
import MovieView from './view/MoviesView.js';
// Crear instancias de los modelos y vistas
const indexModel = new IndexModel();
const movieModel = new MovieModel([]);
const indexView = new IndexView();
const movieView = new MovieView(movieModel);
// Crear el controlador y configurarlo
const indexController = new IndexController(indexView, indexModel, movieModel, movieView);
indexController.init();
