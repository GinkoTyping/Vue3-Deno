import DEFAULT_MEMBER from "./default-data/member.js";
import DEFAULT_LINK from "./default-data/link.js";
import { getDB, passwordHash } from "../util/index.js";
import { getAllLink, insertLink, updateLinkRatings, updateLinkUserPointsByUserId } from "../model/link.modle.js";
import { updateMemberPoint } from "../model/member.modle.js";

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

function initMembersPoints() {
  const links = getAllLink();
  const pointsByMember = links.reduce((pre, cur) => {
    JSON.parse(cur.likes).forEach(userId => {
      if (pre[userId]) {
        pre[userId] += 1;
      } else {
        pre[userId] = 1;
      }
    });

    JSON.parse(cur.dislikes).forEach(userId => {
      if (pre[userId]) {
        pre[userId] -= 1;
      } else {
        pre[userId] = -1;
      }
    });
    return pre;
  }, {});
  Object.entries(pointsByMember).forEach(([key,value]) => {
    updateMemberPoint({
      userId: Number(key),
      totalPoints: value,
    });
  });
}
//#endregion

//#region link
function createLinkTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS link (
      linkId INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      userPoints TEXT NOT NULL,
      title TEXT NOT NULL,
      desc TEXT NOT NULL,
      isShow INTEGER NOT NULL,
      likes TEXT,
      dislikes TEXT,
      rating INTEGER NOT NULL,
      createdAt INTEGER NOT NULL
    )
  `);

  DEFAULT_LINK.forEach((defaultLink) => {
    insertLink(defaultLink, true);
  });
  updateLinkRatings(true);
}

function initLinkMemberPoints() {
  const db = getDB();
  const members = db.queryEntries(
    'SELECT userId FROM member'
  );
  db.close();
  members.forEach(member => {
    updateLinkUserPointsByUserId(member.userId);
  });
}

//#endregion

export async function initDatabase() {
  db = getDB();
  resetTables();
  await createMemberTable();
  createLinkTable();
  db.close();

  initMembersPoints();
  initLinkMemberPoints();
}
