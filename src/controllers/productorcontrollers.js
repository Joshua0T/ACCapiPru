import { json } from 'express';
import {pool} from '../db.js';


export const postproductor = async (req,res) =>{
    try {
        const {nombre,telefono,correo,descripcion} = req.body;
        if(!nombre||!telefono||!correo||!descripcion){
            return res.status(400).json({
                mensaje:'todos los campos son obligatorios'
            });
        }
        const [telefonoexistente] = await pool.query(
            'SELECT id_productor FROM productor WHERE telefono=?',
            [telefono]
        );
        
        if (telefonoexistente.length> 0){
            return res.status(409).json({
                mensaje:'el telefono ya esta registrado'
            });
        }
        const [correoexistente] = await pool.query(
            'SELECT id_productor FROM productor WHERE correo=?',
            [correo]
        );
        if(correoexistente.length >0){
            return res.status(409).json({
                mensaje:'el correo ya esta registrado'
            });
        }
        const [resultado] = await pool.query(
            'INSERT INTO productor (nombre,telefono,correo,descripcion) values(?,?,?,?)',
            [nombre,telefono,correo,descripcion]   
        )
        res.status(201).json({
            mensaje:'usuario creado correctamente',
            usuario:{
                id: resultado.insertId,
                nombre,
                telefono,
                correo,
                descripcion
            }
        })       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje:'Error interno del servidor'
        })
    }
}


export const getproductor = async (req,res) =>{
    try {
        const {id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'El id debe ser numerico'
            });
        }

        const sql = `SELECT id_productor , nombre ,telefono ,correo ,descripcion FROM productor WHERE id_productor = ?
        `;

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.length === 0){
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        res.status(200).json(resultado[0]);
    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor',
            error: error.message
        })
    }
}



export  const getproductores = async (req,res) => {
    try {
        const sql = `select id_productor , nombre, telefono, correo , descripcion from productor`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:'error del servidor'
        });
    }
}


export const putproductor = async (req,res) => {
    try {
        const {id} = req.params;
        const {nombre,telefono,correo,descripcion} = req.body;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'el id debe ser numerico'
            });
        }

        const sql = 'update productor set nombre = ?, telefono = ?, correo = ? , descripcion = ? where id_productor = ?';

        const [resultado] = await pool.query(sql,[
            nombre,
            telefono,
            correo,
            descripcion,
            id
        ]);

        if (resultado.affectedRows===0){
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

export const deleteproductor = async(req,res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:'el id debe ser numerico'
            });
        }

        const sql = `delete from productor where id_productor = ?`

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje: 'usuario eliminado correctamente'
            });
        } 

        res.status(200).json({
            mensaje:'relacion eliminada correctamente'
        });

    } catch (error) {
        res.status(500),json({
            mensaje:'error del servidor',
            error:error.message
        })
    }
}