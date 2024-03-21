
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getMovies() {//get
    const [rows] = await pool.query(`
    SELECT *
    FROM Movies
    ORDER BY Created_At ASC;
    `)
    return rows
}

async function modifyMovie(Id, Title, Director, Year, Rating, ImgURL) {//put
    //const { Title, Director, Year, Rating, imgURL}= newMovie
    const modifyRow = await pool.query(`
    UPDATE Movies
    SET Title = ? , Director = ? , Year = ? , Rating = ? , Imgurl = ?
    WHERE Id = ?;
    `, [Title, Director, Year, Rating, ImgURL, Id])
    return getMovies()
}

async function createNewMovie(Id, Title, Director, Year, Rating, imgurl) {//post.
    const [newMovie] = await pool.query(`
    insert into Movies (Id, Title, Director, Year, Rating, ImgURL) 
    VALUES (?, ?, ?, ?, ?, ?);
    `, [Id, Title, Director, Year, Rating, imgurl])
    return getMovies()
}

async function deleteMovie(Id) {//delete.
    const movieToDelet = await pool.query(`
    DELETE FROM Movies 
    WHERE Id = ?
    `, [Id])
    return getMovies()
}

async function ObtenerPelicula(Id) {
    try {
        const rows = await pool.query(`
        SELECT *
        FROM Movies
        WHERE Id = ?
        `, [Id])
        return rows[0]
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
module.exports = {
    getMovies,
    modifyMovie,
    createNewMovie,
    deleteMovie,
    ObtenerPelicula
};