import { APIkey, PAGE_SIZE, NEWS_API_FROM_DAYS } from './constants.js';

let mockSavedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

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
  return date.toISOString().split('T')[0];
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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: token === "user2" ? "Jane Smith" : "John Doe",
          email: "user@example.com",
        },
      });
    }, 300);
  });
}

function getArticles() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSavedArticles);
    }, 300);
  });
}

function addArticleSaved(article, token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle = {
        ...article,
        _id: Date.now().toString(),
        keyword: article.keyword || article.topic || "General",
      };
      mockSavedArticles.push(newArticle);
      localStorage.setItem("savedArticles", JSON.stringify(mockSavedArticles));
      resolve(newArticle);
    }, 200);
  });
}

function removeArticleSaved(articleId, token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockSavedArticles = mockSavedArticles.filter(
        (a) => a._id !== articleId
      );
      localStorage.setItem("savedArticles", JSON.stringify(mockSavedArticles));
      resolve({ message: "Article removed" });
    }, 200);
  });
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