import { queryAllLinks, queryFavoriteLinks, handleUpdateLinkLike, handleUpdateLinkIsShow } from "../controller/link.controller.js";

export default function (router) {
  router.get('/link/all', queryAllLinks);
  router.get('/link/favorite/:userId', queryFavoriteLinks);
  router.post('/link/update-like', handleUpdateLinkLike);
  router.post('/link/update-show', handleUpdateLinkIsShow);
};
