import { useLocation } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsArticles = [],
  displayCount = 0,
  savedArticles = [],
  onSaveArticle,
  onDeleteArticle,
  savedArticleUrls = [],
}) {
  const location = useLocation();
  const isSavedNewsRoute = location.pathname.startsWith("/saved-news");

 const articlesToRender = isSavedNewsRoute
    ? savedArticles
    : newsArticles.slice(0, displayCount);

  return (
    <ul className="news-card-list">
      {articlesToRender.map((article, index) => (
        <NewsCard
          key={article._id || article.url || index}
          newsArticle={article}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
          savedArticles={savedArticles}
          savedArticleUrls={savedArticleUrls}
          isSavedNewsRoute={isSavedNewsRoute}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;