import {pool} from "../db.js"

export const postcafe = async (req,res) => {
    try {
        
        const{
            id_finca,
            id_administrador,
            nombre_cafe,
            descripcion,
            perfil_taza,
            proceso,
            aroma,
            sabor,
            imagen_principal
        } = req.body;

        if(!id_finca||
           !id_administrador||
           !nombre_cafe     
        ){
            return res.status(400).json({
                mensaje: "Todos los campos obligatorios deben ser enviados"
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO cafe
            (
            id_finca,
            id_administrador,
            nombre_cafe,
            descripcion,
            perfil_taza,
            proceso,
            aroma,
            sabor,
            imagen_principal
            )

            VALUES(?,?,?,?,?,?,?,?,?)
            `,
            [
                id_finca,
                id_administrador,
                nombre_cafe,
                descripcion,
                perfil_taza,
                proceso,
                aroma,
                sabor,
                imagen_principal
            ]
        );

        res.status(201).json({
            mensaje:"cafe registrado correctamente",
            id_cafe: resultado.insertId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje:"error del servidor",
            error: error.message
        })
    }
}

export const getcafe = async(req,res) => {
    try {
        const{id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `select id_cafe, id_administrador,nombre_cafe,descripcion,perfil_taza,proceso,aroma,sabor,imagen_principal from cafe where id_cafe=?`

        const [resultado] = await pool.query(sql,[id]);

        if(resultado.length === 0){
            return res.status(404).json({
                mensaje: "usuario no encontrado"
            })
        }
        res.status(200).json(resultado[0]);
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error:error.message

        })
    }
}

export const getcafes = async (req,res) => {
    try {
        const sql = `select id_cafe ,id_administrador,nombre_cafe,descripcion,perfil_taza,proceso,aroma,sabor,imagen_principal from cafe`;

        const [resultado] = await pool.query(sql)

        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({
            mensaje:"error del servidor",
            error:error.message
        })
    }
}

export const putcafe = async(req,res) => {
    try {
        const{id} = req.params
        const{id_finca,
              id_administrador,
              nombre_cafe,
              descripcion,
              perfil_taza,
              proceso,
              aroma,
              sabor,
              imagen_principal,
              estado_publicacion
        }  = req.body;

        const [resultado] = await pool.query(
            `update cafe set
            id_finca = ?,
            id_administrador = ?,
            nombre_cafe = ?,
            descripcion = ?,
            perfil_taza = ?,
            proceso = ?,
            aroma = ?,
            sabor = ?,
            imagen_principal = ?,
            estado_publicacion = ? 
            where id_cafe = ?`,
            [
                id_finca,
                id_administrador,
                nombre_cafe,
                descripcion,
                perfil_taza,
                proceso,
                aroma,
                sabor,
                imagen_principal,
                estado_publicacion,
                id
            ]
        );

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje: "cafe no encontrado"
            });
        }

        res.json({
            mensaje: "cafe actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje:"error interno del servidor"
        });
    }
}