import { getLoginMember } from "../model/member.modle.js";

export async function handleLogin(context) {
  const { username, password } = await context.request.body.json();

  const res = getLoginMember({ username, password });
  context.response.body = res;
}