import {pool} from "../db.js"

export const posttrazabilidad = async (req,res) => {
    try {
        const{
                id_finca,
                id_administrador,
                codigo_trazabilidad,
                cordenadas,
                certificaciones,
                informacion_eudr,
        } = req.body;
        if(!id_finca||!id_administrador||!codigo_trazabilidad){
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }
       
        const [resultado] = await pool.query(
            `insert into trazabilidad_eudr
        (
        id_finca,
        id_administrador,
        codigo_trazabilidad,
        cordenadas,
        certificaciones,
        informacion_eudr
        )
        VALUES (?,?,?,?,?,?)`,
        [
            id_finca,
            id_administrador,
            codigo_trazabilidad,
            cordenadas,
            certificaciones,
            informacion_eudr
        ]
        );

        res.status(201).json({
            mensaje:"trazabilidad registrada correctamente",
            id_trazabilidad: resultado.insertId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: error.message
        })
    }
} 

export const gettrazabilidad = async(req,res) => {
    try {
        const {id} = req.params;
        
        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql =`select id_trazabilidad,id_finca,id_administrador,codigo_trazabilidad,cordenadas,certificaciones,informacion_eudr from trazabilidad_eudr where id_trazabilidad =?`;

        const [resultado] = await pool.query(sql,[id]);
        if(resultado.length === 0){
            return res.status(404).json({
                mensaje:"trazabilidad no encontrada"
            })
        }
        return res.status(200).json(resultado[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje:"error del servidor"
        })
    }
}

export const gettrazabilidades = async(req,res) => {
    try {
        const sql = `select id_trazabilidad,id_finca,id_administrador,codigo_trazabilidad,cordenadas,certificaciones,informacion_eudr,fecha_registro from trazabilidad_eudr`;
        
        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        })
    }
}