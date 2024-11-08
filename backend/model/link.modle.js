import { getDB, getAverageScore } from "../util/index.js";

export function insertLink(linkInfo, close = false) {
  const db = getDB();
  db.query(`INSERT INTO link VALUES(null, ?1, ?2, ?3, ?4, ?5, ?6, 0, ?7)`, [
    linkInfo.userId,
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
  return db.queryEntry(`SELECT * FROM link`);
}

export function updateLinkRatings() {
  const db = getDB();

  const output = db.query(`SELECT likes, dislikes FROM link`);
  const totalLinkCount = output.length;
  const { totalLikeCount, totalAllRateCount  } = output.reduce((pre, cur) => {
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

    db.query(`UPDATE link SET rating = ?1 WHERE linkId = ?2`, [Math.ceil(rating), index]);
  }
}
