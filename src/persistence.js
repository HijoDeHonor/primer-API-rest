const database = require('./database.js');


async function leerPeliculas() {
    try {
        let data = await database.getMovies();
        console.log(`Peliculas ObtenIdas.`);
        console.log(data, 'data')
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function borrarPelicula(Id) {
    try {
        console.log(Id, 'persistence')
        await database.deleteMovie(Id)
        console.log('La pelicula fue Borrada.')
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function modificarPelicula(Id, Title, Director, Year, Rating, ImgURl) {
    try {
        await database.modifyMovie(Id, Title, Director, Year, Rating, ImgURl)
        console.log('La pelicula fue Modificada.')
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function crearNuevaPelicula(pelicula) {
    try {
        const { Id, Title, Director, Year, Rating, ImgURL } = pelicula;
        await database.createNewMovie(Id, Title, Director, Year, Rating, ImgURL)
        console.log('La pelicula fue Creada.')
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = {
    leerPeliculas,
    borrarPelicula,
    modificarPelicula,
    crearNuevaPelicula
};