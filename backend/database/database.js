import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

import DEFAULT_MEMBER from "./default-data/member.js";
import DEFAULT_LINK from "./default-data/link.js";
import { passwordHash } from "../util/index.js";
import { insertLink, updateLinkRatings } from "../model/link.modle.js";

let db;

function resetTables() {
  db.execute(`DROP TABLE IF EXISTS member`);
  db.execute(`DROP TABLE IF EXISTS link`);
}

//#region member
async function createMemberTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS member (
      userId INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      points INTEGER
    )  
  `);

  const promises = DEFAULT_MEMBER.map((defaultMember) =>
    insertMember(defaultMember)
  );
  await Promise.all(promises);
}

async function insertMember(memberInfo) {
  const password = await passwordHash(memberInfo.password);
  db.query(
    `
    INSERT INTO member VALUES(null, ?1, ?2, 0)
  `,
    [memberInfo.username, password]
  );
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
      dislikes TEXT,
      rating INTEGER NOT NULL,
      ceatedAt INTEGER NOT NULL
    )
  `);

  DEFAULT_LINK.forEach((defaultLink) => {
    insertLink(defaultLink);
  });
  updateLinkRatings();
}

//#endregion

export async function initDatabase() {
  db = new DB("./database/Database.db");

  resetTables();
  await createMemberTable();
  createLinkTable();

  db.close();
}
