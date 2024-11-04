import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import path from 'node:path';

export function getLoginMember({ username, password }) {
  const db = new DB(path.resolve(import.meta.dirname, '../database/Database.db'));
  const member = db.query(`SELECT * FROM member WHERE username=?`, [username]);

  db.close();
  return member;
}