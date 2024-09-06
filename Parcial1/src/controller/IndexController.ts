import IndexModel from '../model/IndexModel.js';
import MovieModel from '../model/MovieModel.js';
import IndexView from '../view/IndexView.js';
import MenuView from '../view/MenuView.js';
import MovieView from '../view/MoviesView.js';

export default class IndexController {
    private view: IndexView;
    private model: IndexModel;

    private movieView: MovieView;
    private movieModel: MovieModel;

    private menuView: MenuView;

    constructor(view: IndexView, model: IndexModel) {
        this.view = view;
        this.model = model;

        this.movieModel = new MovieModel([]);
        this.movieView = new MovieView(this.movieModel);

        this.menuView=new MenuView()

        this.view.setMovieView(this.movieView);//Despues de inicializarla
        this.view.setMenuView(this.menuView)
    }

    public async init(): Promise<void> {
        const data = await this.model.getMoviesFromFile(); // Asegúrate de tener el método getMoviesFromFile en tu modelo de índice
        this.movieModel.setMovies(data);
        this.view.render()
    }
}
