import type { Config } from "drizzle-kit";
    
    export default {
      schema: "./src/db/schema.ts",
      out: "./drizzle",
      driver: 'mysql2',
      dbCredentials: {
        connectionString: "mysql://freedb_minerbomb:CVxzSfN8VU!RS9f@sql.freedb.tech:3306/freedb_gamelandmc"
      }
    } satisfies Config;
