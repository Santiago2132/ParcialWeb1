import MovieModel from '../Movie/MovieModel.js';
import MenuView from '../Menu/MenuView.js';
import MovieView from '../Movie/MoviesView.js';
export default class IndexController {
    view;
    model;
    movieView;
    movieModel;
    menuView;
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.movieModel = new MovieModel([]);
        this.movieView = new MovieView(this.movieModel);
        this.menuView = new MenuView();
        this.view.setMovieView(this.movieView);
        this.view.setMenuView(this.menuView);
    }
    async init() {
        const data = await this.model.getMoviesFromFile(); // Asegúrate de tener el método getMoviesFromFile en tu modelo de índice
        this.movieModel.setMovies(data);
        this.view.render();
    }
}
