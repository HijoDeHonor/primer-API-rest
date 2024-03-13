const { Router } = require('express');
const router = Router();
const crypto = require('crypto')
const _ = require('underscore')

const movies = require('../sample.json');


router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {

    if (!req.body.title || !req.body.director || !req.body.year || !req.body.rating || !req.body.imgURL) {//siempre tratar de ir por el camino mas corto y
        res.status(400).json({ error: "Faltan datos." });                                                   //si es un error ponerlo al principio
        return;                                                                                           //para al retornar no usar tantas lineas para arriba.
    }
    const id = crypto.randomUUID(); //se usa esta linea para no repetir id, en vez de la de abajo que prodrian llegar a repetirse
    //const id = movies[movies.length-1].id + 1; es la linea que se trata de evitar
    const nuevaPeli = { ...req.body, id };
    movies.push(nuevaPeli);
    res.status(201).json(movies); // retornamos el status 201 (creado) y adicionalmente el arreglo nuevo.
});


router.delete('/:id', (req, res) => {
    let isDelete = false;
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            movies.splice(i, 1);
            isDelete = true;
        }
    });

    if (!isDelete) {
        res.status(404).json({ error: "No se encontro la id" });
        return;
    }
    res.json(movies);
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating, imgURL } = req.body;
    if (title && director && year && rating && imgURL) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
                movie.imgURL = imgURL;
            }

        });
        res.json(movies);

    } else {
        res.status(500).json({ error: 'Ocurrio un ERROR.' })
    }
});


module.exports = router;