import { useState, useEffect, lazy, Fragment } from "react";
import "./App.css";
import Loading from "./pages/Loading/Loading";
import Main from "./pages/Main/Main";
import NavBar from "./Header/NavBar";
import About from "./pages/About/About";
// lazy導入元件
const ImgSroll = lazy(() => import("./pages/ImgSroll/ImgSroll"));
const Culture = lazy(() => import("./pages/Culture/Culture"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const History = lazy(() => import("./pages/History/History"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 模擬讀取時間
  const simulateLoad = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
  //loading頁面
  const preloadPages = async () => {
    document.body.style.overflow = "hidden";
    for (let i = 0; i < 6; i++) {
      // 讀取時間
      await simulateLoad(400);
      // 更新進度
      const progress = ((i + 1) / 6) * 100;
      setLoadingProgress(progress);
    }
    await simulateLoad(800);
    setIsLoading(false);
   
    document.body.style.overflow = "";
  };

  useEffect(() => {
    preloadPages();
  }, []);

  //主要內容
  return (
    <div className="App">
      <Loading  loadingProgress={loadingProgress} isLoading={isLoading}/>
      {!isLoading &&
      <Fragment>
        <NavBar />
        <Main />
        <About />
        <Categories />
        <ImgSroll />
        <Culture />
        <History />
      </Fragment>
      }
    </div>
  );
};

export default App;
