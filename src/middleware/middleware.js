import {pool} from '../db.js'


export const verificarIP = async (req,res,next) => {
    try {
        let ip = req.ip;

        //limpia formato IPv6
        if (ip.startsWith('::ffff:')){
            ip = ip.replace('::ffff:','');

        }

        console.log('IP detectada:',ip);
        
        const [resultado] = await pool.query(
            `SELECT *
            FROM ip_autorizada
            WHERE  direccion_ip = ?
            AND estado = true`,
            [ip]
        );

        if (resultado.length === 0) {
            return res.status(403).json({
                mensaje: 'Acceso denegado',
                ip_detectada: ip
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error verificado IP',
            error:error.message
        })    }
}