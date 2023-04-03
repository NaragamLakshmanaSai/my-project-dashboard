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
  apiKey: "AIzaSyD0vy4ru9V3GaTgrzcnUym1XmRFnVkosy4",
  authDomain: "my-project-auth-69218.firebaseapp.com",
  projectId: "my-project-auth-69218",
  storageBucket: "my-project-auth-69218.appspot.com",
  messagingSenderId: "115583969302",
  appId: "1:115583969302:web:abfb5be0ced8224aa9ad37"
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
