import { getDB, passwordHash } from "../util/index.js";

export function getLoginMember(username) {
  const db = getDB();
  const member = db.queryEntries(`SELECT * FROM member WHERE username=?`, [username]);
  db.close();

  return member?.[0];
}

export function getMemberById(userId) {
  const db = getDB();
  const member = db.queryEntries(
    'SELECT * FROM member WHERE userId=?',
    [userId]
  );
  return member?.[0];
}

export async function setRegisterMember({ username, password }) {
  const db = getDB();
  const data = db.queryEntries(`SELECT * FROM member WHERE username=?`, [username]);
  if (data?.length) {
    db.close();
    return null;
  } else {
    const hashed = await passwordHash(password);
    db.query(`INSERT INTO member VALUES(null, ?1, ?2, 0)`, [username, hashed]);
    db.close();
    return  { username };
  }
}

export function updateMemberPoint(params) {
  const { userId, totalPoints, changedPoints } = params;

  const db = getDB();

  let finalPoints;
  if (!isNaN(totalPoints)) {
    finalPoints = totalPoints;
  } else if (!isNaN(changedPoints)) {
    const user = db.queryEntries('SELECT points FROM member WHERE userId=?1', [userId])?.[0];
    finalPoints = user.points + changedPoints;
  }

  db.query(
    'UPDATE member SET points=?1 WHERE userId=?2',
    [finalPoints, userId]
  );

  db.close();
}