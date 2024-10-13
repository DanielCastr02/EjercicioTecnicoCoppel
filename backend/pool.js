import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'danielcastro',
  host: 'localhost',
  database: 'articulos',
  password: '',
  port: 5432, 
});


export default pool;
