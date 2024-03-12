const { Router } = require('express');
const router = Router();

const _ = require('underscore')

const movies = require('../sample.json');


router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    const { title, director, year, rating, imgURL} = req.body;
    if (title && director && year && rating) {
        const id = movies.length + 1;
        const nuevaPeli = { ...req.body, id };
        movies.push(nuevaPeli);
        res.json(movies);
    } else {
        res.status(500).json({ error: "Ocurrio un ERROR." });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating, imgURL } = req.body;
    if (title && director && year && rating && imgURL ) {
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