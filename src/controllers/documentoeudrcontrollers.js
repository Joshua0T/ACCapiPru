import { json } from "express";
import {pool} from "../db.js"

export const postdocumento = async (req,res) => {
    try {
        const {
            id_trazabilidad,
            id_administrador,
            nombre_documento,
            url_documento,
            tipo_documento
        } = req.body;
        if(!id_trazabilidad||!id_administrador||!nombre_documento||!url_documento){
            return res.status(400).json({
                mensaje:"Todos los campos son obligatorios"
            });
        }

        const [resultado] = await pool.query(
            `insert into documento_eudr
            (
            id_trazabilidad,
            id_administrador,
            nombre_documento,
            url_documento,
            tipo_documento
            )
            VALUES (?,?,?,?,?)
            `,
            [
                id_trazabilidad,
                id_administrador,
                nombre_documento,
                url_documento,
                tipo_documento
            ]
        );
        
        res.status(201).json({
            mensaje:"documento registrado correctamente",
            id_documento:resultado.insertId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            mensaje: error.message
        })
    }
}

export const getdocumento = async(req,res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){

            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `select id_documento,id_trazabilidad, id_administrador,nombre_documento,url_documento,tipo_documento,fecha_carga from documento_eudr where id_documento = ?`;

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

export const getdocumentos = async (req,res) => {
    try {
        const sql = `select id_documento,id_trazabilidad,id_administrador,nombre_documento,url_documento,fecha_carga from documento_eudr`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error:error.message
        })
    }
}