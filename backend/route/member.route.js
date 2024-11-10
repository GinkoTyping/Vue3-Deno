import { handleLogin, handleRegister, queryUser } from "../controller/member.controller.js";

export default function (router) {
  router.post('/member/query', queryUser);
  router.post('/member/login', handleLogin);
  router.post('/member/register', handleRegister);
};
