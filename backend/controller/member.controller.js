import { getLoginMember, setRegisterMember } from "../model/member.modle.js";
import { passwordVerify } from "../util/index.js";

export async function handleLogin(context) {
  const { username, password: inputPassword } =
    await context.request.body.json();

  const member = getLoginMember(username);

  let data;
  if (member) {
    const isRight = await passwordVerify(inputPassword, member.password);
    isRight
      ? (data = {
          isSuccess: true,
          message: "Login succeeded.",
          username: member.username,
          userId: member.userId,
          points: member.points,
        })
      : (data = {
          isSuccess: false,
          message: "Wrong password, please check it.",
        });
  } else {
    data = { isSuccess: false, message: "Wrong username, please check it." };
  }

  context.response.body = data;
}

export async function handleRegister(context) {
  const { username, password } = await context.request.body.json();
  const newMember = await setRegisterMember({ username, password });

  if (!newMember) {
    context.response.status = 400;
    context.response.body = {
      isSuccess: false,
      message: "Current username has been used. Please use another.",
    };

    return;
  }

  const isSuccess = true;
  const user = getLoginMember(newMember.username);

  context.response.status = 200;
  context.response.body = {
    isSuccess: true,
    username: user.username,
    userId: user.userId,
    points: user.points,
    message: isSuccess
      ? "Register succeeded."
      : `Register failed. Username "${username}" is used already.`,
  };
}

export async function queryUser(context) {
  const { username } = await context.request.body.json();
  const member = getLoginMember(username);

  delete member.password;
  context.response.body = member;
}
