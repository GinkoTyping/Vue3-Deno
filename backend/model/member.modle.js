import { getDB, passwordHash } from "../util/index.js";

export function getLoginMember(username) {
  const db = getDB();
  const member = db.queryEntries(`SELECT * FROM member WHERE username=?`, [username]);
  db.close();

  return member?.[0];
}

export async function setRegisterMember({ username, password }) {
  const db = getDB();
  const data = db.queryEntries(`SELECT * FROM member WHERE username=?`, [username]);
  if (data?.length) {
    return null;
  } else {
    const hashed = await passwordHash(password);
    db.query(`INSERT INTO member VALUES(null, ?1, ?2, 0)`, [username, hashed]);
    return  { username };
  }
}