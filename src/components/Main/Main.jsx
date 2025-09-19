import { useState } from "react";
import "./Main.css";
import "../SearchForm/SearchForm.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import notfound from "../../assets/notfound.jpg";

function Main({
  onSearch,
  newsArticles,
  onSaveArticle,
  savedArticles,
  savedArticleUrls,
  isLoading,
  topic,
  submitError,
}) {
  const [displayCount, setDisplayCount] = useState(3);

  const updateDisplayCount = () => {
    setDisplayCount(displayCount + 3);
  };

  return (
    <main className="main">
      <div className="main__content">
        <section className="search">
          <h2 className="main__title">What's going on in the world?</h2>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm
            onSearch={onSearch}
            submitError={submitError}
            isLoading={isLoading}
          />
        </section>
      </div>
      {topic && (
        <div className="main__search-results-wrapper">
          <section className="main__search-results">
            {!isLoading && newsArticles.length > 0 && (
              <>
                <h2 className="main__search-results-title">Search results</h2>
                <NewsCardList
                  newsArticles={newsArticles}
                  displayCount={displayCount}
                  onSaveArticle={onSaveArticle}
                  savedArticles={savedArticles}
                  savedArticleUrls={savedArticleUrls}
                />
                {displayCount < newsArticles.length && (
                  <div className="main__search-results-button-wrapper">
                    <button
                      onClick={updateDisplayCount}
                      type="button"
                      className="main__search-results-expand-button"
                    >
                      Show more
                    </button>
                  </div>
                )}
              </>
            )}
            {!isLoading && newsArticles.length === 0 && (
              <>
                <div className="main__not-found">
                  <img
                    src={notfound}
                    alt="magnifying glass with a frowny face"
                    className="main__not-found-image"
                  />
                  <h2 className="main__not-found-title">Nothing found</h2>
                  <p className="main__not-found-text">
                    Sorry, but nothing matched <br></br> your search terms.
                  </p>
                </div>
              </>
            )}
            {isLoading && (
              <>
                <Preloader />
                <p className="main__preloader-text">Searching for news...</p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default Main;