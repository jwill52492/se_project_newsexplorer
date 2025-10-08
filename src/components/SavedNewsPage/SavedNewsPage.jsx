import React, { useContext } from 'react';
import './SavedNewsPage.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';

const SavedNewsPage = ({ savedArticles }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="saved-news-page">
      <NewsCardList
        title="Saved Articles"
        articleCount={savedArticles.length}
        currentUser={currentUser}
        keywords={uniqueKeywords}
      />
      {savedArticles.length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        <ul className="saved-news-list">
          {savedArticles.map((article) => (
            <li key={article._id || article.url} className="saved-news-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SavedNewsPage;
