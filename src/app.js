import 'dotenv/config';
import express from 'express';
import { env } from 'process';

var app = express();
const port = env.PORT

app.listen(port, () => {
    console.log(`Servidor rodando ${port}`)
})