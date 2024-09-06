import MovieModel from '../model/MovieModel.js';
import Movie from '../types/Movie.js'
import Observer from '../types/Observer.js';


export default class MovieView extends Observer<MovieModel> {
    private selector: HTMLDivElement;

    constructor(subject: MovieModel) {
        super(subject);
        this.selector = document.querySelector('movies') as HTMLDivElement ?? document.createElement('movies');
        if (!this.selector) {
            console.error("El elemento <movies> no se encontró en el DOM.");
        } else {
            console.log("El elemento <movies> fue encontrado correctamente.");
        }
    }


    public update(): void {
        this.render();

    }

    public render(): void {
        console.log("Renderizando la vista de películas");
        this.addSearchBar();
        this.addMovieCarousel();
        this.addListeners();
    }

    private addMovieCarousel(): void {
        const existingCarousel = this.selector.querySelector('.carousel');
        if (existingCarousel) {
            this.selector.removeChild(existingCarousel);
        }        
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        const movies: Movie[] = (this.subject as MovieModel).getMovies();
        movies.forEach((movie: Movie) => {
            const card = this.createMovieCard(movie);
            carousel.appendChild(card);
        });
        this.selector.appendChild(carousel);
    }

    private createMovieCard(movie: Movie): HTMLDivElement {
        const card = document.createElement('div');
        card.className = 'movie-card';
    
        const img = document.createElement('img');
        img.src = movie.thumbnail;
        img.width = movie.thumbnail_width;
        img.height = movie.thumbnail_height;
        img.alt = movie.title;
    
        const title = document.createElement('h3');
        title.textContent = movie.title;
    
        const description = document.createElement('p');
        description.textContent = movie.extract;
    
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
    
        return card;
    }
    
    private addListeners(): void {
        // Aquí puedes agregar listeners a las tarjetas de películas, como para mostrar detalles al hacer clic
        const cards = this.selector.getElementsByClassName('movie-card');
        for (const element of cards) {
            const card = element as HTMLDivElement;
            card.addEventListener('click', () => {
            console.log(`Movie clicked: ${(this.subject as MovieModel).getMovies().find(movie => movie.title === card.querySelector('h3')?.textContent)?.title}`);
        });
        }
    }
    
    private addSearchBar(): void {
        // Crear el input de búsqueda si no existe
        if (!this.selector.querySelector('.search-bar')) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'form-control search-bar';
            searchInput.placeholder = 'Buscar películas...';
    
          // Insertar el input de búsqueda en el DOM
            this.selector.insertBefore(searchInput, this.selector.firstChild);
    
          // Añadir listener para filtrar las tarjetas de películas
            searchInput.addEventListener('input', this.filterMovies.bind(this));
        }
    }
    
    private filterMovies(): void {
        const filterText = (this.selector.querySelector('.search-bar') as HTMLInputElement)?.value.toLowerCase() || '';
        const cards = this.selector.getElementsByClassName('movie-card');
    
        for (const card of cards) {
            const title = (card as HTMLDivElement).querySelector('h3')?.textContent?.toLowerCase() ?? '';
            const description = (card as HTMLDivElement).querySelector('p')?.textContent?.toLowerCase() ?? '';
            if (title.includes(filterText) || description.includes(filterText)) {
                (card as HTMLDivElement).style.display = ''; // Mostrar tarjeta si coincide con el filtro
            } else {
                (card as HTMLDivElement).style.display = 'none'; // Ocultar tarjeta si no coincide
            }
        }
    }
}
