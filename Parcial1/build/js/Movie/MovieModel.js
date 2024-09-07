import Subject from '../types/Subject.js';
export default class MovieModel extends Subject {
    movies;
    constructor(movies) {
        super();
        this.movies = movies;
    }
    getMovies() {
        return this.movies;
    }
    setMovies(movies) {
        this.movies = movies;
    }
}
