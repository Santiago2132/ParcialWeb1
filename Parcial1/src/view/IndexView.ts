import MovieView from '../view/MoviesView.js';
import MenuView from './MenuView.js';

export default class IndexView {
    private movieView: MovieView | undefined;
    private menuView: MenuView | undefined

    constructor() {
        this.movieView = undefined;
        this.menuView=undefined;
    }

    public setMovieView(movieView: MovieView): void {
        this.movieView = movieView;
    }

    public setMenuView(menuView: MenuView){
        this.menuView=menuView;
    }
    public render(): void {
        if (this.movieView) {
        this.movieView.render()
        }
        if(this.menuView){
            this.menuView.render()
        }
    }
}
