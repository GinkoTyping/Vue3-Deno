import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import path from 'node:path';

export function getDB() {
  return new DB(path.resolve(import.meta.dirname, '../database/Database.db'));
}