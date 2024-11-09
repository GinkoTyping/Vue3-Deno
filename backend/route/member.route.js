import { handleLogin, handleRegister, queryUser } from "../controller/member.controller.js";
import { queryAllLinks, queryFavoriteLinks, handleUpdateLinkLike } from "../controller/link.controller.js";

export default function (router) {
  router.post('/member/query', queryUser);
  router.post('/member/login', handleLogin);
  router.post('/member/register', handleRegister);

  router.get('/link/all', queryAllLinks);
  router.get('/link/favorite/:userId', queryFavoriteLinks);
  router.post('/link/update-like', handleUpdateLinkLike);
};
