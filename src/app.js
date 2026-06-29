import express from 'express';
import adminroutes from './routes/authadministrador.routes.js'
import ip from './routes/authip.routes.js'
import adminip from './routes/administradorip.routes.js'
import productor from './routes/productor.routes.js'
import finca from './routes/finca.routes.js'
import historial from './routes/historial.routes.js'

const app = express()

app.use(express.json());

app.use('/api',adminroutes,ip,adminip,productor,finca,historial)

export default app;

