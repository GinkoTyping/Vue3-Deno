import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

import DEFAULT_MEMBER from './default-data/member.js';
import DEFAULT_LINK from './default-data/link.js';

let db;

function resetTables() {
  db.execute(`DROP TABLE IF EXISTS member`);
  db.execute(`DROP TABLE IF EXISTS link`);
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
  
  DEFAULT_MEMBER.forEach(defaultMember => {
    insertMember(defaultMember);
  })
}

function insertMember(memberInfo) {
  db.query(`
    INSERT INTO member VALUES(null, ?1, ?2, 0)
  `, [memberInfo.username, memberInfo.password]);
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
      isShow INTEGER NOT NULL,
      likes TEXT,
      dislikes TEXT
    )  
  `);

  DEFAULT_LINK.forEach(defaultLink => {
    insertLink(defaultLink);
  })
}

function insertLink(linkInfo) {
  db.query(`
    INSERT INTO link VALUES(null, ?1, ?2, ?3, ?4, ?5, ?6)
  `, [linkInfo.userId, linkInfo.title, linkInfo.desc, linkInfo.isShow, JSON.stringify(linkInfo.likes ?? ''), JSON.stringify(linkInfo.dislikes ?? '')]);
}
//#endregion

export function initDatabase() {
  db = new DB("./database/Database.db");

  resetTables();
  createMemberTable();
  createLinkTable();

  db.close();
}
