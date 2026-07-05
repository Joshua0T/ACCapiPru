import {pool} from '../db.js'




export const getip = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'El id debe ser numerico'
            })
        }

    const sql = `SELECT id_ip,direccion_ip,nombre_equipo,estado,fecha_registro  FROM ip_autorizada WHERE id_ip=? `;

    const [resultado] = await pool.query(sql,[id]);

    if (resultado.length === 0){
        return res.status(404).json({
            mensaje:'Usuario no encontrado'
        });
    }
    res.status(200).json(resultado[0]);
    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor',
            error:error.message
        })
    }
}

export const getips = async (req,res) => {
    try {
        const sql = `SELECT id_ip,nombre_equipo,estado,fecha_registro FROM ip_autorizada`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:'error del servidor',
            error:error.message
        });
    }
}

export const postip = async (req,res) => {
    try {
        const {direccion_ip,nombre_equipo,estado} = req.body;
        if(!direccion_ip||!nombre_equipo|| typeof estado !== 'boolean'){
            return res.status(400).json({
                mensaje:'todos los campos son obligatorios'
            });
        }
        const [ipexistente] = await pool.query(
            'SELECT id_ip FROM ip_autorizada WHERE direccion_ip=?',
            [direccion_ip]
        );

        if (ipexistente.length > 0){
            return res.status(409).json({
                mensaje:'la ip ya esta registrada'
            });
        }

        const [resultado] = await pool.query(
            'INSERT INTO ip_autorizada (direccion_ip,nombre_equipo,estado) values(?,?,?)',
            [direccion_ip,nombre_equipo,estado]
        )
        res.status(201).json({
            mensaje:'usuario creado correctamente',
            usuario:{
                id:resultado.insertId,
                direccion_ip,
                nombre_equipo,
                estado
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}

export const putip = async (req,res) => {
    try {
        const {id} = req.params;
        const {direccion_ip,nombre_equipo,estado} =req.body;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'el id sebe ser numerico'
            });
        }

        const sql = `update ip_autorizada set direccion_ip = ?, nombre_equipo = ?, estado = ?  where id_ip = ? `;

        const [resultado] = await pool.query(sql,[
            direccion_ip,
            nombre_equipo,
            estado,
            id
        ]);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje :" ip no encontrada"
            });
        }

        res.status(200).json({
            mensaje:"usuario actualizado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "error del servidor",
            error:error.message
        })
    }
}


export const deleteip = async (req,res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            });
        }

        const sql = `delete from ip_autorizada where id_ip = ?`

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:"ip no encontrada"
            });
        }
        res.status(200).json({
            mensaje:"ip eliminada correctamente"
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "error del servidor",
            error:error.message
        })
    }
}

