export default class IndexController {
    view;
    model;
    movieView;
    movieModel;
    constructor(view, model, movieModel, movieView) {
        this.view = view;
        this.model = model;
        this.movieModel = movieModel;
        this.movieView = movieView;
        this.view.setMovieView(this.movieView);
    }
    async init() {
        const data = await this.model.getMoviesFromFile(); // Asegúrate de tener el método getMoviesFromFile en tu modelo de índice
        this.movieModel.setMovies(data);
    }
}
