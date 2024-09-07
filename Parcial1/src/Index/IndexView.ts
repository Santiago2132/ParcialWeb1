import MovieView from '../Movie/MoviesView';
import MenuView from '../Menu/MenuView.js';

export default class IndexView {
    private movieView: MovieView | undefined;
    private menuView: MenuView | undefined;
    private currentStylesheet: HTMLLinkElement | null = null;

    constructor() {
        this.movieView = undefined;
        this.menuView = undefined;

        // Inicia la verificación del tamaño de la ventana
        this.updateStylesheet();
        window.addEventListener('resize', this.updateStylesheet.bind(this));
    }

    public setMovieView(movieView: MovieView): void {
        this.movieView = movieView;
    }

    public setMenuView(menuView: MenuView): void {
        this.menuView = menuView;
    }

    public render(): void {
        if (this.movieView) {
            this.movieView.render();
        }
        if (this.menuView) {
            this.menuView.render();
        }
    }

    private updateStylesheet(): void {
        const width = window.innerWidth;
        const existingStylesheet = this.currentStylesheet;

        let newStylesheetUrl = '';

        if (width >= 600) {
            newStylesheetUrl = './css/app/index.css';
        } else {
            newStylesheetUrl = './css/app/index600px.css';
        }

        if (!existingStylesheet || existingStylesheet.href !== newStylesheetUrl) {
            if (existingStylesheet) {
                document.head.removeChild(existingStylesheet);
            }
            
            const newStylesheet = document.createElement('link');
            newStylesheet.rel = 'stylesheet';
            newStylesheet.href = newStylesheetUrl;
            document.head.appendChild(newStylesheet);

            this.currentStylesheet = newStylesheet;
        }
    }
}
