import { useLocation } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsArticles,
  displayCount,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  savedArticleUrls,
}) {
  const location = useLocation();
  const isSavedNewsRoute = location.pathname.startsWith("/saved-news");

  return !isSavedNewsRoute ? (
    <ul className="news-card-list">
      {newsArticles.slice(0, displayCount).map((item, index) => {
        return (
          <NewsCard
            key={index}
            newsArticle={item}
            onSaveArticle={onSaveArticle}
            savedArticles={savedArticles}
            savedArticleUrls={savedArticleUrls}
          />
        );
      })}
    </ul>
  ) : (
    <ul className="news-card-list">
      {savedArticles.map((item, index) => {
        return (
          <NewsCard
            key={index}
            newsArticle={item}
            onDeleteArticle={onDeleteArticle}
            savedArticles={savedArticles}
            savedArticleUrls={savedArticleUrls}
          />
        );
      })}
    </ul>
  );
}

export default NewsCardList;