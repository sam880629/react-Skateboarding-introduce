import { useState, useEffect,  lazy  } from "react";
import "./App.css";
import LoadingPage from "./components/Loading";
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
    try {

      for (let i = 0; i < 6; i++) {
        // 讀取時間
        await simulateLoad(250);
        // 更新進度
        const progress = ((i + 1) / 6) * 100;
        setLoadingProgress(progress);
      }
  

    } catch (error) {
      // 執行載入錯誤
      console.log("error", error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    preloadPages();
  }, []);

  //  先執行loading頁面
  if (isLoading) {
    return <LoadingPage progress={loadingProgress} />;
  }
  //主要內容
  return (
    <div className="App">
        <NavBar />
        <Main />
        <About />
        <Categories />
        <ImgSroll />
        <Culture />
        <History />
    </div>
  );
};

export default App;
