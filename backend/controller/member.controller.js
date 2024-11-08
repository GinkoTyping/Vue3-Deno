import { getLoginMember, setRegisterMember } from "../model/member.modle.js";
import { passwordVerify } from "../util/index.js";

export async function handleLogin(context) {
  const { username, password: inputPassword } = await context.request.body.json();

  const member = getLoginMember(username);

  let data;
  if (member) {
    const isRight = await passwordVerify(inputPassword, member.password);
    isRight
      ? data = { isSuccess: true, message: 'Login succeeded.', username: member.username, userId: member.userId }
      : data = { isSuccess: false, message: 'Wrong password, please check it.' };
  } else {
    data = { isSuccess: false, message: 'Wrong username, please check it.' };
  }

  context.response.body = data;
}

export async function handleRegister(context) {
  const { username, password } = await context.request.body.json();
  const newMember = await setRegisterMember({ username, password });
  const isSuccess = newMember !== null;

  context.response.status = isSuccess ? 200 : 400;
  context.response.body = {
    isSuccess,
    member: newMember,
    message: isSuccess ? 'Register succeeded.' : `Register failed. Username "${username}" is used already.`,
  };
}