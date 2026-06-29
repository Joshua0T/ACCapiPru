import {pool} from '../db.js'
import bcrypt from 'bcrypt';

export const getadministrador = async (req,res) => {
    try {
        const {id} = req.params;
            // validar id
                if (isNaN(id)){
                    return res.status(400).json({
                        mensaje:'El id debe ser numerico'
                    })
                }

        const sql =`SELECT id_administrador, nombre,correo,fecha_creacion FROM administrador WHERE id_administrador =?` ; 
        
        const [resultado] = await pool.query(sql,[id]);

        if (resultado.length === 0){
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
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


export const getadministradores = async (req,res) => {
    try {
        const sql = `select id_administrador , nombre, correo,fecha_creacion from administrador`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:'error del servidor',
            error: error.message
        });
    }
}



export const postadministrador = async(req,res) => {
    try {
        const {nombre,correo,password} = req.body;
        if(!nombre||!correo||!password){
            return res.status(400).json({
                mensaje:'todos los campos son obligatorios'
            });
        }
        const [usuarioexiste] = await pool.query(
            'SELECT id_administrador FROM administrador WHERE correo=?',
            [correo]
        );

        if (usuarioexiste.length > 0){
            return res.status(409).json({
                mensaje:'el correo ya esta registrado'
            });
        }

        const passwordHash = await bcrypt.hash(password,10);

        const [resultado] = await pool.query(
            'INSERT INTO administrador (nombre,correo,password) values(?,?,?)',
            [nombre,correo,passwordHash]
        )
        res.status(201).json({
            mensaje: 'usuario creado correctamente',
            usuario:{
                id: resultado.insertId,
                nombre,
                correo
            }
        });
    } catch (error) { 
        console.error(error);
        res.status(500).json({
            mensaje:'Error interno del servidor'
        })
    }
}


export const putadministrador = async (req,res) => {
    try {
        const {id} = req.params;
        const {nombre,correo} = req.body;


        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'el id debe ser numerico'
            });
        }
        const sql = `update administrador set nombre = ?, correo =?  where id_administrador = ?`;

        const [resultado] = await pool.query(sql,[
            nombre,
            correo,
            id
        ]);

        if(resultado.affectedRows===0){
            return res.status(404).json({
                mensaje:'usuario no encontrado'
            });
        }

        res.status(200).json({
            mensaje:'usuario actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje:'error del servidor',
            error:error.message
        })        
    }
}


export const deleteadministrador = async(req,res) => {
    try {
        const {id} = req.params;

        if (isNaN(id)){
            return res.status(400).json({
                mensaje:'el id debe ser numerico'
            });
        }

        const sql = `delete from administrador where id_administrador = ?`

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:'usuario elimnado correctamente'
            });
        }

        res.status(200).json({
            mensaje:'administrador eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'error del servidor',
            error: error.message
        })
    }
}