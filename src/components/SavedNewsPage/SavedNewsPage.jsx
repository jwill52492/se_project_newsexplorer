import { useContext } from 'react';
import './SavedNewsPage.css';
import '../Header/Header.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import Header from '../Header/Header';

const SavedNewsPage = ({ savedArticles = [], onSaveArticle, onDeleteArticle, onLogout, handleMobileMenuModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const keywords = (savedArticles || []).map(article => article.keyword).filter(Boolean);
  const uniqueKeywords = [...new Set(keywords)];
  const articleCount = savedArticles.length;

  const getKeywordSummary = () => {
    if (uniqueKeywords.length === 0) return "";
    if (uniqueKeywords.length === 1) return uniqueKeywords[0];
    if (uniqueKeywords.length === 2)
      return `${uniqueKeywords[0]} and ${uniqueKeywords[1]}`;
    return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${
      uniqueKeywords.length - 2
    } other${uniqueKeywords.length - 2 > 1 ? "s" : ""}`;
  };


  return (
    <section className="saved-news__page">
      <Header
        onLogout={onLogout}
        handleMobileMenuModal={handleMobileMenuModal}
      />
       <div className="saved-news__info">
        <p className="saved-news__subtitle">Saved articles</p>
        <h2 className="saved-news__title">
          {currentUser
            ? `${currentUser}, you have ${articleCount} saved article${
                articleCount !== 1 ? 's' : ''
              }`
            : ''}
        </h2>

        {uniqueKeywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: <strong>{getKeywordSummary()}</strong>
          </p>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <p className="saved-news__empty">No saved articles yet.</p>
      ) : (
        <NewsCardList
          newsArticles={savedArticles}
          onSaveArticle={onSaveArticle}
          onDeleteArticle={onDeleteArticle}
          savedArticles={savedArticles}
          savedArticleUrls={new Set(savedArticles.map(article => article.url))}
        />
      )}
    </section>
  );
};


export default SavedNewsPage;
