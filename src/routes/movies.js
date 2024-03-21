const { Router } = require('express');
const router = Router();
const crypto = require('crypto');
const database = require('../database.js');

const persistence = require('../persistence.js');
const { ok } = require('assert');



router.get('/', async (req, res) => {
    const movies = await persistence.leerPeliculas();
    res.json(movies);

});


router.post('/', async (req, res) => {

    if (!req.body.Title || !req.body.Director || !req.body.Year || !req.body.Rating || !req.body.ImgURL) {//siempre tratar de ir por el camino mas corto y
        res.status(400).json({ error: "Faltan datos." });                                                 //si es un error ponerlo al principio
        return;                                                                                           //para al retornar no usar tantas lineas para arriba.
    }
    const Id = crypto.randomUUID();//genera una "id" random de 36 caracteres.
    const nuevaPeli = { ...req.body, Id };
    await persistence.crearNuevaPelicula(nuevaPeli);
    res.status(201).json(await persistence.leerPeliculas()); // retornamos el status 201 (creado) y adicionalmente el arreglo nuevo.
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;    
    if (!await database.ObtenerPelicula(id)) {
        res.status(404).json({ Error: "la pelicula no fue encontrada" })
        return;
    }
    await persistence.borrarPelicula(id);
    res.json(await persistence.leerPeliculas())
})



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Director, Year, Rating, ImgURL } = req.body;

    if (!Title || !Director || !Year || !Rating || !ImgURL || !id) {
        res.status(400).json({ error: "Faltan datos." })
        return;
    }
    let movies = await persistence.leerPeliculas()
    const movieIndex = movies.findIndex(movie => movie.Id == id)
    if (movieIndex === -1) {
        res.status(404).json({ Error: "la pelicula no fue encontrada" })
        return;
    }
    await persistence.modificarPelicula(id, Title, Director, Year, Rating, ImgURL)
    res.json(await persistence.leerPeliculas())
});

module.exports = router;