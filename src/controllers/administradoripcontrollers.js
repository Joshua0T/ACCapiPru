import {pool} from '../db.js'

export const postadministradorip = async (req,res) => {
    try {
        const {id_administrador,id_ip} = req.body;

        if (!id_administrador||!id_ip){
            return res.status(400).json({
                mensaje:'Todos los campos son obligatorios'
            })
        }
        const [existe] = await pool.query(
            `SELECT id_administrador_ip
            FROM administrador_ip
            WHERE id_administrador = ? 
            AND id_ip =?`,
            [id_administrador,id_ip]
        );

        if (existe.length > 0){
            return res.status(409).json({
                mensaje:'La relacion ya existe'
            })
        }

        const [resultado] = await pool.query(
            `INSERT INTO administrador_ip
            (id_administrador,id_ip)
            VALUES (?,?)`,
            [id_administrador,id_ip]
        )
        res.status(201).json({
            mensaje:'IP asignada al administrador correctamente',
            id:resultado.insertId
        });
    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor',
            error: error.message
        })
    }
}

export const getadministradoresip = async (req,res) => {
    try {
        const sql = `SELECT
                    ai.id_administrador_ip,
                    a.id_administrador,
                    a.nombre,
                    a.correo,
                    ip.id_ip,
                    ip.direccion_ip,
                    ip.nombre_equipo,
                    ip.estado
                FROM administrador_ip ai
                INNER JOIN administrador a
                    ON ai.id_administrador = a.id_administrador
                INNER JOIN ip_autorizada ip
                    ON ai.id_ip = ip.id_ip                    
        `;
        const [resultado] = await pool.query(sql);

        res.status(200).json(resultado);
    } catch (error) {
        response.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        });
    }
}


export const getadministradorip = async(req,res) => {
    try {
        const {id}= req.params;

        const sql =`SELECT
                    ai.id_administrador_ip,
                    a.id_administrador,
                    a.nombre,
                    a.correo,
                    ip.id_ip,
                    ip.direccion_ip,
                    ip.nombre_equipo,
                    ip.estado
                FROM administrador_ip ai
                INNER JOIN administrador a
                    ON ai.id_administrador = a.id_administrador
                INNER JOIN ip_autorizada ip
                    ON ai.id_ip = ip.id_ip    
                WHERE a.id_administrador = ?                    
        `;

        const [resultado] = await pool.query(sql,[id]);

        if (resultado.length === 0){
            return res.status(404).json({
                mensaje:'administrador no encontrado'
            })
        }

        res.status(200).json(resultado);

    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor',
            error: error.message
        });
    }
}

export const putadministradorip = async (req,res) => {
    try {
        const {id} = req.params;
        const {id_administrador, id_ip} = req.body;

        if (isNaN(id)){
            return res.status(400).json({
                mensaje:'El id debe ser numerico'
            });
        }

        const sql = `
                    UPDATE administrador_ip
                    SET id_administrador = ?, id_ip = ?
                    WHERE id_administrador_ip = ?
                    `;
        
        const [resultado] = await pool.query(sql,[
            id_administrador,
            id_ip,
            id
        ]);

        if (resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:'Relacion no encontrada'
            });
        }

        res.status(200).json({
            mensaje:'relacion actualizada correctamente'
        })
    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor',
            error: error.message
        })
    }
}

export const deleteadministradorip = async (req,res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'El id debe ser numerico'
            });
        }

        const sql = `DELETE FROM administrador_ip
                    WHERE id_administrador_ip = ?
                    `;

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:'relacion no encontrada'
            });
        }

        res.status(200).json({
            mensaje:'relacion eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje:'error del servidor',
            error: error.message
        })
    }
}