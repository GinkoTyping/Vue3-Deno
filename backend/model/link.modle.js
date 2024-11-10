import { getDB, getAverageScore } from "../util/index.js";
import { getMemberById } from "./member.modle.js";

export function insertLink(linkInfo, close = false) {
  const db = getDB();
  db.query(`INSERT INTO link VALUES(null, ?1, ?2, 0,?3, ?4, ?5, ?6, ?7, 0, ?8)`, [
    linkInfo.userId,
    linkInfo.userName,
    linkInfo.title,
    linkInfo.desc,
    linkInfo.isShow,
    JSON.stringify(linkInfo.likes ?? ""),
    JSON.stringify(linkInfo.dislikes ?? ""),
    Date.now(),
  ]);

  if (close) {
    db.close();
  }
}

export function getAllLink() {
  const db = getDB();
  const output = db.queryEntries(`SELECT * FROM link`);
  db.close();

  return output;
}

export function getLinkById(id) {
  if (!id) {
    return;
  }

  const db = getDB();
  const output = db.queryEntries(
    `SELECT * FROM link WHERE linkid=?1`,
    [id],
  )?.[0];
  db.close();

  return output;
}

export function updateLinkRatings(close = false) {
  const db = getDB();

  const output = db.query(`SELECT likes, dislikes FROM link`);
  const totalLinkCount = output.length;
  const { totalLikeCount, totalAllRateCount } = output.reduce((pre, cur) => {
    pre.totalLikeCount += JSON.parse(cur[0]).length;
    pre.totalAllRateCount += JSON.parse(cur[0]).length + JSON.parse(cur[1]).length;

    return pre;
  }, { totalLikeCount: 0, totalAllRateCount: 0 });

  const avgNumOfRatingsForAll = totalAllRateCount / totalLinkCount;
  const avgRatingForAll = totalLikeCount / (totalAllRateCount * totalLinkCount);


  for (let index = 1; index <= totalLinkCount; index++) {
    const totalRating = JSON.parse(output[index - 1][0]).length;
    const rateCount = totalRating + JSON.parse(output[index - 1][1]).length;
    const rating = getAverageScore({
      avgNumOfRatingsForAll,
      avgRatingForAll,
      totalRating,
      rateCount,
    });

    db.query(
      `UPDATE link SET rating = ?1 WHERE linkId = ?2`,
      [Math.ceil(rating), index]
    );
  }

  if (close) {
    db.close();
  }
}

// likeStatus: 0 dislike, 1 like, 2 default
export function updateLinkLike(params) {
  const db = getDB();
  const { linkId, likeStatus, userId } = params;

  const link = params.link
    ? params.link
    : db.queryEntries(`
      SELECT likes,dislikes FROM link WHERE linkId=?1`,
      [linkId]
    )?.[0];
  if (link) {
    let curLikes = JSON.parse(link.likes);
    let curDislikes = JSON.parse(link.dislikes);

    if (likeStatus === 1 && !curLikes.includes(userId)) {
      curLikes.push(userId);
      curDislikes = curDislikes.filter(item => item !== userId);
    } else if (likeStatus === 0 && !curDislikes.includes(userId)) {
      curDislikes.push(userId);
      curLikes = curLikes.filter(item => item !== userId);
    } else {
      curDislikes = curDislikes.filter(item => item !== userId);
      curLikes = curLikes.filter(item => item !== userId);
    }

    db.query(
      `UPDATE link SET likes=?1, dislikes=?2 WHERE linkId=?3`,
      [
        JSON.stringify(curLikes),
        JSON.stringify(curDislikes),
        linkId
      ],
    );

    updateLinkRatings(true);
  } else {
    throw new Error('Invalid linkId.')
  }
}

export function updateLinkVisible(params) {
  const { linkId, isShow } = params;

  const db = getDB();
  db.query(
    'UPDATE link SET isShow=?1 WHERE linkId=?2',
    [isShow, linkId],
  );

  db.close();
}

export function updateLinkUserPointsByUserId(userId) {
  const db = getDB();

  const links = db.queryEntries(
    'SELECT * FROM link WHERE userId=?',
    [userId],
  );
  if (links?.length) {
    const member = getMemberById(userId);
    links.forEach(link => {
      db.query(
        'UPDATE link SET userPoints=?1 WHERE linkId=?2',
        [member.points, link.linkId],
      );
    });
  }

  db.close();
}
