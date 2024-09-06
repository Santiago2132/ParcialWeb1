import Observer from '../types/Observer.js';
export default class MovieView extends Observer {
    selector;
    constructor(subject) {
        super(subject);
        this.selector = document.querySelector('movies') ?? document.createElement('movies');
        if (!this.selector) {
            console.error("El elemento <movies> no se encontró en el DOM.");
        }
        else {
            console.log("El elemento <movies> fue encontrado correctamente.");
        }
    }
    update() {
        this.render();
    }
    render() {
        console.log("Renderizando la vista de películas");
        this.addSearchBar();
        this.addMovieCarousel();
        this.addListeners();
    }
    addMovieCarousel() {
        const existingCarousel = this.selector.querySelector('.carousel');
        if (existingCarousel) {
            this.selector.removeChild(existingCarousel);
        }
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        const movies = this.subject.getMovies();
        movies.forEach((movie) => {
            const card = this.createMovieCard(movie);
            carousel.appendChild(card);
        });
        this.selector.appendChild(carousel);
    }
    createMovieCard(movie) {
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
    addListeners() {
        // Aquí puedes agregar listeners a las tarjetas de películas, como para mostrar detalles al hacer clic
        const cards = this.selector.getElementsByClassName('movie-card');
        for (const element of cards) {
            const card = element;
            card.addEventListener('click', () => {
                console.log(`Movie clicked: ${this.subject.getMovies().find(movie => movie.title === card.querySelector('h3')?.textContent)?.title}`);
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
    addSearchBar() {
        // Seleccionar el input de búsqueda ya existente en el HTML
        const searchInput = document.querySelector('input');
        if (searchInput) {
            // Añadir listener para filtrar las tarjetas de películas
            searchInput.placeholder = "Busca películas...";
            searchInput.addEventListener('input', this.filterMovies.bind(this));
        }
        else {
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
    filterMovies() {
        // Selecciona el input de búsqueda correcto en el DOM
        const searchInput = document.querySelector('input');
        if (searchInput) {
            const filterText = searchInput.value.toLowerCase();
            const cards = this.selector.getElementsByClassName('movie-card');
            for (const card of cards) {
                const title = card.querySelector('h3')?.textContent?.toLowerCase() ?? '';
                const description = card.querySelector('p')?.textContent?.toLowerCase() ?? '';
                if (title.includes(filterText) || description.includes(filterText)) {
                    card.style.display = ''; // Mostrar tarjeta si coincide con el filtro
                }
                else {
                    card.style.display = 'none'; // Ocultar tarjeta si no coincide
                }
            }
        }
        else {
            console.error("No se encontró el input de búsqueda para filtrar las películas.");
        }
    }
}
