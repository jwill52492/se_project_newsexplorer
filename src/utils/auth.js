import { checkResponse } from './api';

const baseUrl = process.env.NODE_ENV === "production"
  ? 'https://api.newsexplorer.com'
  : 'http://localhost:3001';


const signup = (email, password, username ) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "User created successfully" });
    }, 300);
  })
}

const signin = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "fake-jwt-token" });
    }, 300);
  })
}

const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse)
};

export { signup, signin, getToken };