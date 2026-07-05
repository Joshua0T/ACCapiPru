import express from 'express';
import adminroutes from './routes/authadministrador.routes.js'
import ip from './routes/authip.routes.js'
import adminip from './routes/administradorip.routes.js'
import productor from './routes/productor.routes.js'
import finca from './routes/finca.routes.js'
import historial from './routes/historial.routes.js'
import fotofinca from './routes/fotofinca.routes.js'
import variedadcafe from './routes/variedadcafe.routes.js'
import cafe from './routes/cafe.routes.js'
import trazabilidad from './routes/trazabilidad.routes.js'
import documento from './routes/documento.routes.js'
import codigoqr from './routes/codigoqr.routes.js'
 
const app = express()

app.use(express.json());

app.use('/api',adminroutes,ip,adminip,productor,finca,historial,fotofinca,variedadcafe,cafe,trazabilidad,documento,codigoqr)

export default app;

