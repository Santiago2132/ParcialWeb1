export default class IndexView {
    movieView;
    constructor() {
        this.movieView = undefined;
    }
    setMovieView(movieView) {
        this.movieView = movieView;
    }
    render() {
        if (this.movieView) {
            this.movieView.render();
        }
    }
}
