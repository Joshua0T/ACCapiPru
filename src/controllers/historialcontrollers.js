import {pool} from '../db.js'

export const posthistorial = async (req,res) => {
    try {
        const {id_administrador,entidad,id_registro,accion,descripcion,ip_origen} = req.body;

        if (!id_administrador||
            !entidad||
             id_registro == null||
            !accion||
            !ip_origen){
            return res.status(400).json({
                mensaje:'todos los campos son obligatorios'
            })
        }
        const [resultado] = await pool.query(
            `insert into historial_cambios(
            id_administrador,
            entidad,
            id_registro,
            accion,
            descripcion,
            ip_origen) values (?,?,?,?,?,?)`,
            [
            id_administrador,
            entidad,
            id_registro,
            accion,
            descripcion,
            ip_origen
        ]
        );
        
        res.status(201).json({
            mensaje:'Historial de cambios realizado',
            id_historial_cambios: resultado.insertId
        });

    } catch (error) {
        res.status(500).json({
            mensaje:'erro en el servidor',
            error: error.message
        })
    }
}


export const gethistorial = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id deber ser numerico"
            })
        }

        const sql = `select id_historial,id_administrador,entidad,id_registro,accion,descripcion,ip_origen from historial_cambios where id_historial = ?`;

        const [resultado] = await pool.query(sql,[id]);
        if(resultado.length === 0){
            return res.status(404).json({
                mensaje:"historial no encotrado"
            })
        }
        res.status(200).json(resultado[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje:"error del servidor"
        })
    }
}

export const gethistoriales = async(req,res) => {
    try {
        const sql = `select id_historial,id_administrador,entidad,id_registro,accion,descripcion,ip_origen from historial_cambios`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error:error.message
        })
    }
}