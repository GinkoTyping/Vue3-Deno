import { handleLogin } from "../controller/member.controller.js";

export default function(router) {
  router.post('/member/login', handleLogin);
};
