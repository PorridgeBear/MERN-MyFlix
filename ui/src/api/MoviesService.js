export async function getMovies() {
    const response = await fetch('http://localhost:3080/api/movies');
    return await response.json();
}
