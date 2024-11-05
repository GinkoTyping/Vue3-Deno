import { handleLogin, handleRegister } from "../controller/member.controller.js";

export default function(router) {
  router.post('/member/login', handleLogin);
  router.post('/member/register', handleRegister);
};
