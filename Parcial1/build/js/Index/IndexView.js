export default class IndexView {
    movieView;
    menuView;
    currentStylesheet = null;
    constructor() {
        this.movieView = undefined;
        this.menuView = undefined;
        // Inicia la verificación del tamaño de la ventana
        this.updateStylesheet();
        window.addEventListener('resize', this.updateStylesheet.bind(this));
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
    updateStylesheet() {
        const width = window.innerWidth;
        const existingStylesheet = this.currentStylesheet;
        let newStylesheetUrl = '';
        if (width >= 600) {
            newStylesheetUrl = './css/app/index.css';
        }
        else {
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
