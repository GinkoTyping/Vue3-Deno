import { getAllLink } from "../model/link.modle.js";
import { formatDate } from "../util/index.js";

export function mapLinksToFrontend(links) {
  return links.map(link => ({
    ...link,
    createdAt: formatDate(new Date(link.createdAt)),
    likes: JSON.parse(link.likes),
    dislikes: JSON.parse(link.dislikes),
    likesCount: JSON.parse(link.likes).length,
    dislikesCount: JSON.parse(link.dislikes).length,
  }));
}

export function queryAllLinks(context) {
  context.response.body = mapLinksToFrontend(getAllLink());
}

export function queryFavoriteLinks(context, params) {
  if (isNaN(params.userId)) {
    throw new Error()
  } else {
    const userId = Number(params.userId);
    const links = getAllLink();
    const output = links.filter(link => {
      const likes = JSON.parse(link.likes);
      return likes.includes(userId);
    });
    context.response.body = mapLinksToFrontend(output);
  }
}

