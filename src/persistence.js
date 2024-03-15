const fs = require('fs')

function leerArchivo(fileName) {
    try {
        let data = fs.readFileSync(fileName, 'utf8')
        console.log(`Contenido del archivo '${fileName}' leído correctamente.`)
        return JSON.parse(data);  // Parsea el contenido del archivo JSON

    } catch (error) {
        console.error('Error al parsear el contenido del archivo JSON:', error.message);
        throw new Error('Error al parsear el archivo:', error);
    }

}

function escribirArchivo(fileName, newFile) {
    let newfilejson = JSON.stringify(newFile)
    try {
        fs.writeFileSync(fileName, newfilejson, 'utf8');
        console.log(`La lista se ha guardado en el archivo '${fileName}' correctamente.`);
        return leerArchivo(fileName);
    } catch {
        console.error('Error al guardar el archivo:', error);
        return null;
    }
}










module.exports = {
    leerArchivo,
    escribirArchivo
};

