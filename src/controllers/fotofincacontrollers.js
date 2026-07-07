import {pool} from "../db.js"


export const postfotofinca = async (req,res) => {
    try {
        
        const {
                id_finca,
                url_imagen,
                descripcion
        } = req.body;

        if(!id_finca|| !url_imagen){
            return res.status(400).json({
                mensaje:"Todos los campos son obligatorios"
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO fotografia_finca
            (
                id_finca,
                url_imagen,
                descripcion
            )
            VALUES (?,?,?)
            `,
            [
                id_finca,
                url_imagen,
                descripcion
            ]
        );
        
        res.status(201).json({
            mensaje:"Fotografia registrada correctamente",
            id_fotografia: resultado.insertId
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error del servidor",
            error: error.message
        })
    }
}


export const getfotofinca = async (req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `select id_fotografia,id_finca,url_imagen,descripcion from fotografia_finca where id_fotografia =?`;

        console.log(sql);
        const [resultado]= await pool.query(sql,[id]);

        if(resultado.length === 0){
            return res.status(404).json({
                mensaje:"usuario no encontrado"
            })
        }
        res.status(200).json(resultado[0])
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        })
    }
}

export const getfotofincas = async (req,res) => {
    try {
        const sql = `select id_fotografia,id_finca,url_imagen,descripcion from fotografia_finca`

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        })
    }
}

export const putfotofincas = async (req,res) => {
    try {
        const {id} = req.params;
        const {id_finca,url_imagen,descripcion} = req.body;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `update fotografia_finca set id_finca=?,url_imagen=?,descripcion=?`;

        
    } catch (error) {
        
    }
}