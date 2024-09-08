export default interface Movie {
    price: number;
    score: number;
    title: string;
    year: number;
    cast: string[]; 
    genres: string[]; 
    extract: string; 
    thumbnail: string;
    thumbnail_width: number; 
    thumbnail_height: number; 
}
