import { getLoginMember, setRegisterMember } from "../model/member.modle.js";

export async function handleLogin(context) {
  const { username, password } = await context.request.body.json();

  const member = getLoginMember(username);

  let data;
  if (member) {
    member.password === password 
    ? data = { isSuccess: true, message: 'Login succeeded.' }
    : data = { isSuccess: false, message: 'Wrong password, please check it.' };
  } else {
    data = { isSuccess: false, message: 'Wrong username, please check it.' };
  }

  context.response.body = data;
}

export async function handleRegister(context) {
  const { username, password } = await context.request.body.json();
  const newMember = setRegisterMember({ username, password });
  const isSuccess = newMember !== null;

  context.response.status = isSuccess ? 200 : 400;
  context.response.body = {
    isSuccess,
    member: newMember,
    message: isSuccess ? 'Register succeeded.' : `Register failed. Username "${username}" is used already.`,
  };
}