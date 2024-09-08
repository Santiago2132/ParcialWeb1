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
    
        // Añadir listener para el evento resize
        window.addEventListener('resize', this.updateMoviesPerPage.bind(this));
        
        // Llamada inicial para ajustar el número de películas por página
        this.updateMoviesPerPage();
    }
    

    public update(): void {
        this.render();
    }

    public render(): void {
        console.log("Renderizando la vista de películas");
    
        // Actualiza el número de películas por página basado en el tamaño de la ventana
        this.updateMoviesPerPage();
    
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
    private updateMoviesPerPage(): void {
        const viewportWidth = window.innerWidth;
    
        if (viewportWidth <= 600) {
            this.moviesPerPage = 3; // Si la pantalla es de 600px o menos, mostrar 3 películas por página
        } else {
            this.moviesPerPage = 10; // Para pantallas más grandes, mostrar 10 películas por página
        }
    
        // Vuelve a renderizar el carrusel después de actualizar moviesPerPage
        this.addMovieCarousel();
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
        title.className='title-card'
        title.textContent = movie.title;
    
        const description = document.createElement('p');
        description.className='description'
        description.textContent = movie.extract;
    
        // Crear el contenedor izquierdo
        const containerLeft = document.createElement('div');
        containerLeft.className = 'left-m';
    
        // Crear la puntuación en estrellas de manera asíncrona
        const stars = this.scoreStars(movie.score);
        stars.className = 'star';
        // Crear la lista ordenada de géneros
        const genreList = document.createElement('ul');
        genreList.className = 'genres-list';
        movie.genres.forEach(genre => {
            const genreItem = document.createElement('li');
            genreItem.textContent = genre;
            genreList.appendChild(genreItem);
        });
    
        // Añadir la puntuación y la lista de géneros al contenedor izquierdo
        containerLeft.appendChild(img);
        containerLeft.appendChild(stars);
        containerLeft.appendChild(genreList);
    
        // Crear el contenedor derecho
        const containerRight = document.createElement('div');
        containerRight.className = 'right-m';
        
        containerRight.appendChild(title);
        containerRight.appendChild(description);
    
        // Crear el botón de rentar con el precio (color naranja)
        const rentButton = document.createElement('button');
        rentButton.textContent = `$${this.precio(movie.price)} RENT`;
        rentButton.className = 'rent-button orange-button';
    
        // Añadir el botón debajo de la descripción
        containerRight.appendChild(rentButton);
    
        // Añadir ambos contenedores a la tarjeta
        card.appendChild(containerLeft);
        card.appendChild(containerRight);
    
        return card;
    }
    
        
        // Método auxiliar para crear las estrellas de puntuación
        private scoreStars(score: number): HTMLDivElement {
            const fullStar = '★';
            const emptyStar = '☆';
            const totalStars = 5;
        
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars-container';
        
            for (let i = 0; i < totalStars; i++) {
                const star = document.createElement('span');
                star.textContent = i < score ? fullStar : emptyStar;
                starsContainer.appendChild(star);
            }
        
            return starsContainer;
        }

    private precio(price:number):string{
        return price.toLocaleString()
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

        
        const totalPages = Math.ceil((this.subject as MovieModel).getMovies().length / this.moviesPerPage);
    
        // Botón para ir a la página anterior
        if (this.currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '←';  // Usar una flecha izquierda
            prevButton.className = 'pagination-btn';  // Clase para estilo
            prevButton.addEventListener('click', () => {
                this.currentPage--;
                this.render();  // Re-renderiza la vista con la nueva página
            });
            paginationContainer.appendChild(prevButton);
        }
    
        // Contador de páginas
        const pageCounter = document.createElement('span');
        pageCounter.textContent = `${this.currentPage}/${totalPages}`;
        pageCounter.className = 'page-counter';  // Clase para estilo
        paginationContainer.appendChild(pageCounter);
    
        // Botón para ir a la página siguiente
        if (this.currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '→';  // Usar una flecha derecha
            nextButton.className = 'pagination-btn';  // Clase para estilo
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