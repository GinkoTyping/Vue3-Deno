import { getAllLink } from "../model/link.modle";

export function queryAllLinks() {
  return getAllLink();
}

export function queryFavoriteLinks(params) {
  if (isNaN(params.userId)) {
    throw new Error()
  } else {
    const userId = Number(params.userId);
    const links = getAllLink();
    return links.filter(link => {
      const likes = JSON.parse(link.likes);
      return likes.includes(userId);
    });
  }
}

