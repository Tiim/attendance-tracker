const get = async (url) => {
  return fetch(url, { credentials: 'include' });
};

const post = async (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
};

const put = async (url, body) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
};

const del = async (url) => {
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });
};

export default {
  get,
  put,
  post,
  del,
};
