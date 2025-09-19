import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';

import './App.css';
import { APIkey } from '../../utils/constants';

import About from '../About/About';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import LogoutModal from '../LogoutModal/LogoutModal';
import Main from '../Main/Main';
import MobileMenu from '../MobileMenu/MobileMenu';
import RegisterModal from '../RegisterModal/RegisterModal';
import RegisterSuccessModal from '../RegisterSuccessModal/RegisterSuccessModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getTodaysDate, getDateFromDaysAgo, searchNews as getNews, getUserData as getUser, getArticles as getSavedArticles, addArticleSaved as saveArticle, removeArticleSaved, filterArticles } from '../../utils/api';
import { signin, signup, getToken as getUserWithToken } from '../../utils/auth';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const savedArticleUrls = new Set(
    savedArticles.map((article) => {
      return article.url;
    })
  );

  const handleRegisterModal = () => setActiveModal("register-user");
  const handleLoginModal = () => setActiveModal("login-user");
  const handleRegisterSuccessModal = () => setActiveModal("success");
  const handleConfirmLogoutModal = () => setActiveModal("confirm-logout");
  const handleMobileMenuModal = () => setActiveModal("mobile-menu");
  const handleCloseModal = () => setActiveModal("");

  const handleSaveArticle = (article) => {
    saveArticle(article)
      .then((data) => {
        setSavedArticles((prev) => [...prev, { ...data, topic }]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getSavedArticles()
      .then((data) => {
        setSavedArticles(data);
      })
      .catch(console.error);
  }, []);

  const handleDeleteArticle = (article) => {
    deleteArticle(article._id)
      .then(() => {
        const tempArray = savedArticles.filter((item) => {
          return item !== article;
        });
        setSavedArticles(tempArray);
      })
      .catch(console.error);
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user.data.name);
          return getSavedArticles(token);
        })
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch(console.error);
        deleteToken();
    }
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setSubmitError("Please enter a keyword");
      return;
    }
    setIsLoading(true);
    setTopic(query);
    getNews(query)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setSubmitError(
          "Sorry, something went wrong during the request.  Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterUser = () => {
    signup(email, password, username)
    handleRegisterSuccessModal();
  };

  const handleLoginUser = ({ email, password }) => {
    signin(email, password)
      .then((token) => {
        setToken(token);
        return getUser(token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data.name);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogoutModal = () => {
    handleConfirmLogoutModal();
  };

  const handleLogout = () => {
    deleteToken();
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  useEffect(() => {
    handleCloseModal();
  }, [location.pathname]);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="page__background">
                    <Header
                      handleLoginModal={handleLoginModal}
                      onLogout={handleLogoutModal}
                      handleMobileMenuModal={handleMobileMenuModal}
                    />
                    <Main
                      onSearch={handleSearch}
                      newsArticles={articles}
                      onSaveArticle={handleSaveArticle}
                      savedArticles={savedArticles}
                      savedArticleUrls={savedArticleUrls}
                      isLoading={isLoading}
                      topic={topic}
                      submitError={submitError}
                    />
                  </div>
                  <About />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <Header
                    onLogout={handleLogoutModal}
                    handleMobileMenuModal={handleMobileMenuModal}
                  />
                  <SavedNewsPage
                    savedArticles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                    savedArticleUrls={savedArticleUrls}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer isFooter={true} />
        </div>
        <RegisterModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          handleLoginModal={handleLoginModal}
          onRegister={handleRegisterUser}
        />
        <LoginModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          handleRegisterModal={handleRegisterModal}
          onLogin={handleLoginUser}
        />
        <RegisterSuccessModal
          activeModal={activeModal}
          handleLoginModal={handleLoginModal}
          onClose={handleCloseModal}
        />
        <LogoutModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          onLogout={handleLogout}
          isLoading={isLoading}
        />
        <MobileMenu
          activeModal={activeModal}
          onClose={handleCloseModal}
          handleLoginModal={handleLoginModal}
          onLogout={handleLogoutModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;