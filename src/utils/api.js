import { APIkey, PAGE_SIZE, NEWS_API_FROM_DAYS } from './constants.js';


const newsApiBaseUrl = process.env.NODE_ENV === "production"
  ? "https://nomoreparties.co/news/v2/everything?"
  : "https://newsapi.org/v2/everything?";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function getDateFromDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

function getTodaysDate() {
  return new Date().toISOString().split('T')[0];
}

function searchNews(query) {
  const fromDate = getDateFromDaysAgo(NEWS_API_FROM_DAYS);
  const toDate = getTodaysDate();

  const url = `${newsApiBaseUrl}q=${encodeURIComponent(query)}&from=${fromDate}&to=${toDate}&pageSize=${PAGE_SIZE}&apiKey=${APIkey}`;

  return fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    });
}

function getUserData(token) {
  return fetch('https://api.newsexplorer.com/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(checkResponse);
}

function getArticles(token) {
  return fetch('https://api.newsexplorer.com/articles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(checkResponse);
}

function addArticleSaved(article, token) {
  return fetch('https://api.newsexplorer.com/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(article)
  })
  .then(checkResponse);
}

function removeArticleSaved(articleId, token) {
  return fetch(`https://api.newsexplorer.com/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(checkResponse);
}

function filterArticles(articles) {
  const token = localStorage.getItem("jwt");
  if (!token) return articles.map(article => ({ ...article, isSaved: false }));

  return getArticles(token)
    .then(savedArticles => {
      const savedArticleIds = new Set(savedArticles.map(article => article.articleId));
      return articles.map(article => ({
        ...article,
        isSaved: savedArticleIds.has(article.url)
      }));
    })
    .catch(() => articles.map(article => ({ ...article, isSaved: false })));
}

export { checkResponse, getTodaysDate, getDateFromDaysAgo, searchNews, getUserData, getArticles, addArticleSaved, removeArticleSaved, filterArticles };