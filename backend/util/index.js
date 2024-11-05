import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

import path from 'node:path';

export function getDB() {
  return new DB(path.resolve(import.meta.dirname, '../database/Database.db'));
}

export function passwordHash(text) {
  return bcrypt.hash(text);
}
export function passwordVerify(text, hash) {
  return bcrypt.compare(text, hash);
};
