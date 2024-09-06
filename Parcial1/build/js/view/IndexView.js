export default class IndexView {
    movieView;
    constructor() {
        this.movieView = undefined;
    }
    setMovieView(movieView) {
        this.movieView = movieView;
    }
    render() {
        if (this.movieView != undefined) {
            this.movieView.render();
        }
    }
}
