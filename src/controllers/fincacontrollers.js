import {pool} from '../db.js'

export const postfinca = async (req,res) => {
    try {
        const {id_productor,
            nombre_finca,
            departamento,
            municipio,
            direccion,
            altitud,
            area_total,
            area_cultivada,
            descripcion
    } = req.body;

    if (!id_productor||
        !nombre_finca||
        !departamento||
        !municipio||
        !direccion||
         altitud == null||
         area_total == null||
         area_cultivada == null||
        !descripcion){
            return res.status(400).json({
                mensaje:'todos los campos son obligatorios'
            });
    }

   

    const [resultado] = await pool.query(
        `INSERT INTO finca(
         id_productor,
         nombre_finca,
         departamento,
         municipio,
         direccion,
         altitud,
         area_total,
         area_cultivada,
         descripcion
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [
            id_productor,
            nombre_finca,
            departamento,
            municipio,
            direccion,
            altitud,
            area_total,
            area_cultivada,
            descripcion
         ]
    );
    res.status(201).json({
        mensaje:'Finca registrada correctamente',
        id_finca: resultado.insertId
    });
    } catch (error) {
       res.status(500).json({
        mensaje: 'error del servidor'
       }) 
    }
}

