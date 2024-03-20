const { Router } = require('express');
const router = Router();
const crypto = require('crypto');


const persistence = require('../persistence.js');
const listaDePelis = 'src/sample.json';


router.get('/', (req, res) => {
    const movies = persistence.leerArchivo(listaDePelis);
    
    res.json(movies);

});


router.post('/', (req, res) => {

    if (!req.body.title || !req.body.director || !req.body.year || !req.body.rating || !req.body.imgURL) {//siempre tratar de ir por el camino mas corto y
        res.status(400).json({ error: "Faltan datos." });                                                 //si es un error ponerlo al principio
        return;                                                                                           //para al retornar no usar tantas lineas para arriba.
    }
    const id = crypto.randomUUID(); //se usa esta linea para no repetir id, en vez de la de abajo que prodrian llegar a repetirse
    //const id = movies[movies.length-1].id + 1; es la linea que se trata de evitar
    const nuevaPeli = { ...req.body, id };
    console.log(nuevaPeli);
    let movies = persistence.leerArchivo(listaDePelis)
    movies.push(nuevaPeli);
    persistence.escribirArchivo(listaDePelis, movies);
    res.status(201).json(movies); // retornamos el status 201 (creado) y adicionalmente el arreglo nuevo.
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let movies = persistence.leerArchivo(listaDePelis);
    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex == -1) {
        res.status(404).json({ Error: "la pelicula no fue encontrada" })
        return;
    }
    movies.splice(movieIndex, 1);
    persistence.escribirArchivo(listaDePelis, movies);
    res.json(movies);
})



router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating, imgURL } = req.body;

    if (!title || !director || !year || !rating || !imgURL || !id) {
        res.status(400).json({ error: "Faltan datos." })
        return;
    }
    let movies = persistence.leerArchivo(listaDePelis)
    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex === -1) {
        res.status(404).json({ Error: "la pelicula no fue encontrada" })
        return;
    }
    movies[movieIndex] = { id, title, director, year, rating, imgURL };
    persistence.escribirArchivo(listaDePelis, movies)
    res.json(movies)
});




module.exports = router;