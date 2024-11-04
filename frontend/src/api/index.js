const BASE_URL = "http://localhost:8000";
const headers = { "Content-Type": "application/json" };

export async function login(params) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      username: params.username,
      password: params.password,
    }),
  }

  const res = await fetch(`${BASE_URL}/login`, options);
  console.log({res});
}

export function test() {
  return fetch(`${BASE_URL}/login`);
}