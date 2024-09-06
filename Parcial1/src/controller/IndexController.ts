import IndexModel from '../model/IndexModel.js';
import MovieModel from '../model/MovieModel.js';
import IndexView from '../view/IndexView.js';
import MovieView from '../view/MoviesView.js';

export default class IndexController {
    private view: IndexView;
    private model: IndexModel;

    private movieView: MovieView;
    private movieModel: MovieModel;

    constructor(view: IndexView, model: IndexModel, movieModel: MovieModel, movieView: MovieView) {
        this.view = view;
        this.model = model;

        this.movieModel = movieModel;
        this.movieView = movieView;

        this.view.setMovieView(this.movieView);
    }

    public async init(): Promise<void> {
        const data = await this.model.getMoviesFromFile(); // Asegúrate de tener el método getMoviesFromFile en tu modelo de índice
        this.movieModel.setMovies(data);
    }
}
