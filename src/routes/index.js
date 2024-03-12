const { Router } = require('express');
const router = Router();




router.get('/', (req, res) => {
    const data = {
        "name": "Nico",
        "website": "nicoweb.com"
    }
    res.json(data)
})


module.exports = router;
