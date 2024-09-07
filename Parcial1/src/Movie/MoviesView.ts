import MovieModel from '../Movie/MovieModel.js';
import Movie from '../types/Movie.js'
import Observer from '../types/Observer.js';


export default class MovieView extends Observer<MovieModel> {
    private selector: HTMLDivElement;
    private currentPage: number;
    private moviesPerPage: number;

    constructor(subject: MovieModel) {
        super(subject);
        this.selector = document.querySelector('movies') as HTMLDivElement ?? document.createElement('movies');
        this.currentPage = 1;  // Página inicial
        this.moviesPerPage = 10;  // Cantidad de películas por página

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

    /*
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
    }*/

    private addMovieCarousel(): void {
        const existingCarousel = this.selector.querySelector('.carousel');
        if (existingCarousel) {
            this.selector.removeChild(existingCarousel);
        }        
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        const movies: Movie[] = (this.subject as MovieModel).getMovies();
        const startIndex = (this.currentPage - 1) * this.moviesPerPage;
        const endIndex = startIndex + this.moviesPerPage;
        const moviesToDisplay = movies.slice(startIndex, endIndex); 
        moviesToDisplay.forEach(async (movie: Movie) => {
            const card = this.createMovieCard(movie);
            carousel.appendChild(await card);
        });
        this.selector.appendChild(carousel);
        this.addPaginationButtons();  // Añade botones de paginación
    }
    private discoverImages(movie: Movie): Promise<string> {
        const path = './img/movies/';
        const defaultImage = './img/movies/not-icon.png';
        const imageUrl = movie.thumbnail ? path + movie.thumbnail : defaultImage;
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            // Si la imagen carga correctamente
            img.onload = () => resolve(imageUrl);
            // Si hay un error al cargar la imagen, usar la predeterminada
            img.onerror = () => {
                console.log('Imagen no encontrada, utilizando imagen predeterminada');
                resolve(defaultImage);
            };
        });
    }
    
    private async createMovieCard(movie: Movie): Promise<HTMLDivElement> {
        const url = await this.discoverImages(movie);
        const card = document.createElement('div');
        card.className = 'movie-card';
    
        const img = document.createElement('img');
        img.src = url;
        img.alt = movie.title;
        
        const title = document.createElement('h3');
        title.textContent = movie.title;
    
        const description = document.createElement('p');
        description.textContent = movie.extract;
        
        const containerLeft = document.createElement('div');
        containerLeft.className = 'left-m';
    
        const containerRight = document.createElement('div');
        containerRight.className = 'right-m';
    
        containerLeft.appendChild(img);
        containerRight.appendChild(title);
        containerRight.appendChild(description);
        card.appendChild(containerLeft);
        card.appendChild(containerRight);
    
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
    /*
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
    }*/
        private addSearchBar(): void {
            // Seleccionar el input de búsqueda ya existente en el HTML
            const searchInput = document.querySelector('input') as HTMLInputElement;
            
            if (searchInput) {
                // Añadir listener para filtrar las tarjetas de películas
                searchInput.placeholder = "Busca películas...";
                searchInput.addEventListener('input', this.filterMovies.bind(this));
            } else {
                console.error("No se encontró el input de búsqueda en el DOM.");
            }
        }
        
        /*
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
        */
    private filterMovies(): void {
        // Selecciona el input de búsqueda correcto en el DOM
        const searchInput = document.querySelector('input') as HTMLInputElement;
    
        if (searchInput) {
            const filterText = searchInput.value.toLowerCase();
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
        } else {
            console.error("No se encontró el input de búsqueda para filtrar las películas.");
        }
    }

    private addPaginationButtons(): void {
        // Eliminar el contenedor de botones de paginación si ya existe
        const existingPaginationContainer = this.selector.querySelector('.pagination-buttons');
        if (existingPaginationContainer) {
            this.selector.removeChild(existingPaginationContainer);
        }
    
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-buttons';
    
        // Posicionamiento en la esquina inferior derecha
        paginationContainer.style.position = 'absolute';
        paginationContainer.style.bottom = '10px';
        paginationContainer.style.right = '10px';
    
        const totalPages = Math.ceil((this.subject as MovieModel).getMovies().length / this.moviesPerPage);
    
        // Botón para ir a la página anterior
        if (this.currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Anterior';
            prevButton.addEventListener('click', () => {
                this.currentPage--;
                this.render();  // Re-renderiza la vista con la nueva página
            });
            paginationContainer.appendChild(prevButton);
        }
    
        // Botón para ir a la página siguiente
        if (this.currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Siguiente';
            nextButton.addEventListener('click', () => {
                this.currentPage++;
                this.render();  // Re-renderiza la vista con la nueva página
            });
            paginationContainer.appendChild(nextButton);
        }
    
        // Agrega los botones al contenedor principal
        this.selector.appendChild(paginationContainer);
    }
    
}
