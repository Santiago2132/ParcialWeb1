export default class IndexView {
    movieView;
    menuView;
    constructor() {
        this.movieView = undefined;
        this.menuView = undefined;
    }
    setMovieView(movieView) {
        this.movieView = movieView;
    }
    setMenuView(menuView) {
        this.menuView = menuView;
    }
    render() {
        if (this.movieView) {
            this.movieView.render();
        }
        if (this.menuView) {
            this.menuView.render();
        }
    }
}
