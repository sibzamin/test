import { drizzle } from 'drizzle-orm/mysql2';
    import mysql from 'mysql2/promise';
    
    // create the connection to database
    const connection = await mysql.createConnection({
      host: 'sql.freedb.tech',
      port: 3306,
      user: 'freedb_minerbomb',
      password: 'CVxzSfN8VU!RS9f',
      database: 'freedb_gamelandmc'
    });
    
    export const db = drizzle(connection);
