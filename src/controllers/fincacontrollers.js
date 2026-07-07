import {pool} from '../db.js'

export const postfinca = async (req,res) => {
    try {
        const {
            id_productor,
            nombre_finca,
            departamento,
            municipio,
            direccion,
            altitud,
            area_total,
            area_cultivada,
            descripcion
    } = req.body;
//validar campos obligatorios
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
        console.log(error);

       res.status(500).json({
        mensaje: 'error del servidor',
        error: error.message
       }) 
    }
}


export const getfinca = async(req,res) => {
    try {
        const {id}=req.params;
        if (isNaN(id)){
              return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }
    
    const sql = `select id_finca, id_productor,nombre_finca,departamento,municipio,direccion,altitud,area_total,area_cultivada,descripcion,estado_publicacion from finca where id_finca =?`;

    const [resultado] = await pool.query(sql,[id]);

    if(resultado.length === 0){
        return res.status(400).json({
            mensaje: "usuario no encontrado"
        })
    }
    res.status(200).json(resultado[0])
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error:error.message
        })
    }
}

export const getfincas = async(req,res) => {
    try {
        const sql = `select id_finca,id_productor,nombre_finca,departamento,municipio,direccion,altitud,area_total,area_cultivada,descripcion,estado_publicacion,fecha_registro from finca`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        })
    }
}


export const putfinca = async (req,res) => {
    try {
        const {id} = req.params;

        const {id_productor,nombre_finca,departamento,municipio,direccion,altitud,area_total,area_cultivada,descripcion} = req.body;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `update finca set id_productor=?,nombre_finca=?,departamento=?,municipio=?,direccion=?,altitud=?,area_total=?,area_cultivada=?,descripcion=?`;

        const [resultado] = await pool.query(sql,[
            id_productor,
           
            nombre_finca,
            departamento,
            municipio,
            direccion,
            altitud,
            area_total,
            area_cultivada,
            descripcion,
            id
        ])

        if(resultado.affectedRows===0){
            return res.status(404).json({
                mensaje:"finca no encontrada"
            })
        }

        res.status(200).json({
            mensaje:"finca actualizada"
        })
    } catch (error) {
        return res.status(500).json({
            mensaje:"error en el sevidor",
            error: error.message
        })
    }
}