import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import path from 'node:path';

export function getLoginMember(username) {
  const db = new DB(path.resolve(import.meta.dirname, '../database/Database.db'));
  const member = db.queryEntries(`SELECT * FROM member WHERE username=?`, [username]);
  db.close();

  return member?.[0];
}