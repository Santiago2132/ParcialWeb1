export default class IndexModel {
    movies;
    constructor() {
        this.movies = [];
    }
    init = async () => {
        this.movies = await this.getMoviesFromFile();
    };
    getMoviesFromFile = async () => {
        const response = await fetch('./database/movies-2020s.json');
        if (response.status !== 200) {
            return [];
        }
        console.log("Se envio");
        console.log(response);
        return await response.json();
    };
    getMovies = () => {
        return this.movies;
    };
}
