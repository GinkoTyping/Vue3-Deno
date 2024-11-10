import { getAllLink, getLinkById, updateLinkLike, updateLinkUserPointsByUserId, updateLinkVisible } from "../model/link.modle.js";
import { updateMemberPoint } from "../model/member.modle.js";
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
  const { previousStatus, likeStatus, linkId, userId, linkUserId } = await context.request.body.json();
  if (previousStatus === likeStatus) {
    context.response.status = 400;
    context.response.body = {
      message: 'Nothing to change.'
    };
    return;
  }

  const link = getLinkById(linkId);
  if (!link) {
    context.response.status = 401;
    context.response.body = {
      message: 'Invalid linkId.'
    };
    return;
  }

  updateLinkLike({ link, linkId, likeStatus, userId });
  handleUpdateMemberPoints(previousStatus, likeStatus, linkUserId);
  updateLinkUserPointsByUserId(linkUserId);

  context.response.body = {
    message: 'Update succeeded.',
    isSuccess: true,
  };
}

function handleUpdateMemberPoints(previousStatus, newStatus, userId) {
  
  let changedPoints;
  if (previousStatus === 0) {
    changedPoints = newStatus === 1 ? 2 : 1;
  } else if (previousStatus === 1) {
    changedPoints = newStatus === 0 ? -2 : -1;
  } else {
    changedPoints = newStatus === 0 ? -1 : 1;
  }
  updateMemberPoint({
    userId,
    changedPoints,
  });
}

export async function handleUpdateLinkIsShow(context) {
  const { linkId, userId, isShow } = await context.request.body.json();
  const link = getLinkById(linkId);

  if (link.userId !== userId) {
    context.response.status = 400;
    context.response.body = {
      message: 'Not allowed to modify others link.'
    };
    return;
  }

  updateLinkVisible({ linkId, isShow });

  context.response.body = {
    isSuccess: true,
    message: 'Switching visibilty succeeded.'
  };
}
