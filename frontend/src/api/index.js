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
  };

  const res = await fetch(`${BASE_URL}/member/login`, options);
  return res.json();
}

export async function register(params) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      username: params.username,
      password: params.password,
    }),
  };

  const res = await fetch(`${BASE_URL}/member/register`, options);
  return res.json();
}

export async function getMemberInfo(username) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      username,
    }),
  };

  const res = await fetch(`${BASE_URL}/member/query`, options);
  return res.json();
}

export async function getAllLink() {
  const res = await fetch(`${BASE_URL}/link/all`);
  return res.json();
}

export async function getFavorite(userId) {
  const res = await fetch(`${BASE_URL}/link/favorite/${userId}`);
  return res.json();
}

// likeStatus: 0 dislike, 1 like, 2 default
export async function updateLinkLike(params) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  };
  const res = await fetch(`${BASE_URL}/link/update-like`, options);
  return res.json();
}

export async function updateLinkIsShow(params) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  };

  const res = await fetch(`${BASE_URL}/link/update-show`, options);
  return res.json();
}