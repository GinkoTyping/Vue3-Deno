import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

import path from 'node:path';

//#region DB
export function getDB() {
  return new DB(path.resolve(import.meta.dirname, '../database/Database.db'));
}
//#endregion

//#region Hash encode
export function passwordHash(text) {
  return bcrypt.hash(text);
}

export function passwordVerify(text, hash) {
  return bcrypt.compare(text, hash);
};
//#endregion

//#region Average
const LIKE_CORE = 100;
const MODIFIER = .7;
export function getAverageScore({ avgNumOfRatingsForAll, avgRatingForAll, totalRating, rateCount }) {
  return ((avgNumOfRatingsForAll * avgRatingForAll * LIKE_CORE * MODIFIER) + totalRating * LIKE_CORE) / (rateCount + (avgNumOfRatingsForAll * MODIFIER));
}
//#endregion

export function formatDate(date) {
  const options = { 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit'
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
}