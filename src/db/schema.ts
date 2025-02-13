import { mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';
    
    export const rules = mysqlTable('rules', {
      id: varchar('id', { length: 256 }).primaryKey(),
      type: varchar('type', { length: 256 }),
      content: text('content'),
    });
