import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db;
const DEFAULT_USERNAME = 'test';
const DEFAULT_PASSWORD = '666666';

function resetTables() {
  db.execute(`DROP TABLE IF EXISTS member`);
}

//#region member
function createMemberTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS member (
      userId INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      points INTEGER
    )  
  `);
  
  insertMember();
}

function insertMember(memberInfo = null) {
  const username = memberInfo?.username ?? DEFAULT_USERNAME;
  const password = memberInfo?.password ?? DEFAULT_PASSWORD;

  db.query(`
    INSERT INTO member VALUES(null, ?1, ?2, 0)
  `, [username, password]);
}
//#endregion

//#region link
function createLinkTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS link (
      linkId INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      likes ENUM,
      dislikes ENUM
    )  
  `);
}

function insertLink(linkInfo) {

}
//#endregion

export function initDatabase() {
  db = new DB("./database/Database.db");

  resetTables();
  createMemberTable();
  createLinkTable();

  db.close();
}
