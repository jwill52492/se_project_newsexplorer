import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";
import saveIcon from "../../assets/saved-icon.svg";
import saveIconHover from "../../assets/saveIconHover.svg";
import saveIconSaved from "../../assets/saveIconSaved.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import deleteIconHover from "../../assets/deleteIconHover.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function NewsCard({
  newsArticle,
  onSaveArticle,
  onDeleteArticle,
  savedArticleUrls,
}) {
  const isSaved = savedArticleUrls.has(newsArticle?.url);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isSavedNewsRoute = location.pathname.startsWith("/saved-news");
  const { isLoggedIn } = useContext(CurrentUserContext);

  const handleSaveClick = () => {
    if (!isLoggedIn) return;

    if (!isLoggedIn) return;
    isSaved ? onDeleteArticle(newsArticle) : onSaveArticle(newsArticle);
  };

  const handleDeleteClick = () => {
    onDeleteArticle(newsArticle);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const getImageSrc = () => {
    if (isSaved) return saveIconSaved;
    if (isHovered) return saveIconHover;
    return saveIcon;
  };

  const imageSrc = newsArticle.urlToImage || newsArticle.image;
  const date = newsArticle.publishedAt || newsArticle.date;
  const source = newsArticle.source?.name || newsArticle?.source || "Unknown Source"; ;


  return newsArticle ? (
    <div className="news-card">
      <div
        className={`news-card__save-icon-wrapper ${
          isLoggedIn ? "news-card__hide-tooltip" : "news-card__show-tooltip"
        }`}
        data-tooltip={isLoggedIn ? "" : "Sign in to save articles"}
      >
        {!isSavedNewsRoute ? (
          <img
            src={getImageSrc()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSaveClick}
            alt="icon for saving news article"
            className="news-card__save-icon"
          />
        ) : (
          <div
            className="news-card__delete-icon-wrapper"
            data-tooltip="Remove from saved"
          >
            <img
              className="news-card__delete-icon"
              alt="icon of a garbage can"
              src={isHovered ? deleteIconHover : deleteIcon}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleDeleteClick}
            />
          </div>
        )}
      </div>
      {isSavedNewsRoute && isSaved ? (
        <p className="news-card__keyword">
          {(() => {
            const label = newsArticle?.keyword || newsArticle?.topic || "General";
            return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
          })()}
        </p>
      ) : (
        ""
      )}

      <a href={newsArticle?.url || newsArticle?.link} target="_blank" rel="noopener noreferrer">
        <div className="news-card__content">
          <img
            src={newsArticle.urlToImage || newsArticle.image}
            alt="picture of the news article"
            className="news-card__image"
          />
          <div className="news-card__info">
            <p className="news-card__date">
              {formatDate(newsArticle?.publishedAt || newsArticle?.date)}
            </p>
            <h2 className="news-card__title">{newsArticle?.title}</h2>
            <p className="news-card__description">{newsArticle?.description || newsArticle?.text}</p>
            <p className="news-card__source">{newsArticle?.source?.name || newsArticle?.source || "Unknown Source"}</p>
          </div>
        </div>
      </a>
    </div>
  ) : (
    ""
  );
}

export default NewsCard;