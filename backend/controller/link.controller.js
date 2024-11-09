import { getAllLink, getLinkById, updateLinkLike } from "../model/link.modle.js";
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

export function queryFavoriteLinks(context) {
  if (isNaN(context.params?.userId)) {
    throw new Error()
  } else {
    const userId = Number(context.params.userId);
    const links = getAllLink();
    const output = links.filter(link => {
      const likes = JSON.parse(link.likes);
      return likes.includes(userId);
    });
    context.response.body = mapLinksToFrontend(output);
  }
}

export async function handleUpdateLinkLike(context) {
  const { isLike, linkId, userId } = await context.request.body.json();
  const link = getLinkById(linkId);

  if (!link) {
    context.response.status = 400;
    context.response.body = {
      messgae: 'Invalid linkId.'
    };
    return;
  }

  updateLinkLike({ link, linkId, isLike, userId });

  context.reponse.body = {
    messgae: 'Update succeeded.',
    isSuccess: true,
  };
}

