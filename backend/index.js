import express from 'express';
import pool from './pool.js';
import cors from 'cors';

import articulosRoutes from './routes/articulosRoutes.js';
import DCF_Routes from './routes/DCF_Routes.js';

const app = express();

const port = 3000;

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Successfully connected!!');
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api/articulos', articulosRoutes);
app.use('/api/dcf', DCF_Routes);


app.get('/', ()=>{
  console.log('Here is the rabbit');
})

app.listen(port, () =>
  console.log(`Server listen on port ${port}`)
);