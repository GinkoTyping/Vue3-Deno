import { handleLogin, handleRegister } from "../controller/member.controller.js";
import { queryAllLinks, queryFavoriteLinks } from "../controller/link.controller.js";

export default function (router) {
  router.post('/member/login', handleLogin);
  router.post('/member/register', handleRegister);

  router.get('/link/all', queryAllLinks);
  router.get('/link/favorite/:userId', queryFavoriteLinks);
};
