import { getLoginMember } from "../model/member.modle.js";

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