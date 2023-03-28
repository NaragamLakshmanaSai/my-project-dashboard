import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import ArticlesListPage from "./Pages/ArticlesListPage";
import ArticlePage from "./Pages/ArticlePage";
import PublishArticlePage from "./Pages/PublishArticlePage";
import LoginPage from "./Pages/LoginPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import NavBar from "./NavBar";
import "./App.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBr0hgQgumLva-R5w4Wetkcm4NYtsdt8zA",
  authDomain: "polar-protocol-357117.firebaseapp.com",
  projectId: "polar-protocol-357117",
  storageBucket: "polar-protocol-357117.appspot.com",
  messagingSenderId: "99823031321",
  appId: "1:99823031321:web:23b5d6daec7e2e61794688"
};


const app = initializeApp(firebaseConfig);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/articles/:type/:id" element={<ArticlePage />} />
            <Route path="/publish-article" element={<PublishArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
