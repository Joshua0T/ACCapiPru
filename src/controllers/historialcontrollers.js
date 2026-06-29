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