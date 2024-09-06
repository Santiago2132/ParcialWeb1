import Movie from '../types/Movie.js';
import Subject from '../types/Subject.js';
import MovieView from '../view/MoviesView.js';

export default class MovieModel extends Subject<MovieView>{
    private movies: Movie[];

    constructor(movies: Movie[]) {
        super();
        this.movies = movies;
    }

    public getMovies(): Movie[] {
        return this.movies;
    }

    public setMovies(movies: Movie[]): void {
        this.movies = movies;
    }
}
