import  {pool} from "../db.js"

export const postvariedadcafe = async(req,res) => {
    try {
        const {
                id_finca,
                nombre_variedad,
                descripcion
        } =req.body;

        if(!id_finca||!nombre_variedad){
            return res.status(400).json({
                mensaje:"Todos los campos son obligatorios"
            });
        }
        const [resultado] = await pool.query(
            `INSERT INTO variedad_cafe
            (
            id_finca,
            nombre_variedad,
            descripcion
            )
            VALUES(?,?,?)
            `,
            [
                id_finca,
                nombre_variedad,
                descripcion
            ]
        );

        res.status(201).json({
            mensaje:"variedad de cafe registrada correctamente",
            id_variedad: resultado.insertId
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje:"Error del servidor",
            error: error.message
        })
    }
}

export const getvariedadcafe = async(req,res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){
            return res.status(400).json({
                mensaje:"el id debe ser numerico"
            })
        }

        const sql = `select id_variedad,id_finca,nombre_variedad,descripcion from variedad_cafe where id_variedad=?`;

        const [resultado] = await pool.query(sql,[id]);
        if(resultado.length ===0){
            return res.status(404).json({
                mensaje:"variedad de cafe no encontrado"
            })
        }
        return res.status(200).json(resultado[0])
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensaje:"error del servidor"
        })
    }
}