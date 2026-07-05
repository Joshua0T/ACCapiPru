import { json } from "express";
import {pool} from "../db.js"


export const postcodigoqr = async (req,res) => {
    try {
        const {
            id_finca,
            id_administrador,
            codigo_qr,
            url_destino
        } = req.body;
        
        if(!id_finca||!id_administrador){
            return res.status(400).json({
                mensaje:"todos los campos son obligatorios"
            })
        }
        const [resultado] = await pool.query(
            `insert into codigo_qr
            (
            id_finca,
            id_administrador,
            codigo_qr,
            url_destino
            )
            VALUES (?,?,?,?)
            `,
            [
                id_finca,
                id_administrador,
                codigo_qr,
                url_destino
            ]        
        );

        res.status(201).json({
            mensaje:"Codigo registrado correctamente",
            id_qr: resultado.insertId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            mensaje: error.message
        })
    }
}

export const getcodigoqr = async (req,res) => {
    try {
        const {id} = req.params;
        
        if(isNaN(id)){
            return res.status(400).json({
                mensaje: "el id debe ser numerico"
            })
        }

        const sql = `select id_qr,id_finca,id_administrador, codigo_qr, url_destino,fecha_generacion from codigo_qr where id_qr = ? `;

        const [resultado] = await pool.query(sql,[id]);
        if(resultado.length === 0){
            return res.status(404),json({
                mensaje:"usuario no encontrado"
            });
        }
        
        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje:"error del servidor"
        })
    }
}

export const getcodigosqr = async(req,res) => {
    try {
        const sql = `select
                     id_qr,
                     id_finca,
                     id_administrador,
                     codigo_qr,
                     url_destino,
                     fecha_generacion
                     from codigo_qr`;

         const [resultado] = await pool.query(sql)
         res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor"
        })
    }
}