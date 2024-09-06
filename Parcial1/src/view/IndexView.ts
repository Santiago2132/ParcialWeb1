import MovieView from '../view/MoviesView.js';

export default class IndexView {
    private movieView: MovieView | undefined;

    constructor() {
        this.movieView = undefined;
    }

    public setMovieView(movieView: MovieView): void {
        this.movieView = movieView;
    }

    public render(): void {
        if (this.movieView) {
        this.movieView.render();
        }
    }
}
