import Movie from '../types/Movie.js'

export default class IndexModel {
    private movies: Movie[]

    constructor() {
        this.movies = []
    }

    public init = async (): Promise<void> => {
        this.movies = await this.getMoviesFromFile()
    }

    public getMoviesFromFile = async (): Promise<Movie[]> => {
        const response = await fetch('./database/movies-2020s.json') 
        if (response.status !== 200) {
            return []
        }
        console.log("Se envio")
        console.log(response)
        return await response.json()
    }

    public getMovies = (): Movie[] => {
        return this.movies
    }
}
