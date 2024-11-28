import { useState, useEffect,  lazy } from "react";
import "./App.css";
import LoadingPage from "./components/Loading";
// 導入元件
const NavBar = lazy(() => import("./Header/NavBar"));
const Main = lazy(() => import("./pages/Main/Main"));
const ImgSroll = lazy(() => import("./pages/ImgSroll/ImgSroll"));
const Culture = lazy(() => import("./pages/Culture/Culture"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const About = lazy(() => import("./pages/About/About"));
const History = lazy(() => import("./pages/History/History"));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 元件陣列
  const componentsToLoad = [
    { name: "Main", loader: () => import("./pages/Main/Main") },
    { name: "About", loader: () => import("./pages/About/About") },
    {
      name: "Categories",
      loader: () => import("./pages/Categories/Categories"),
    },
    { name: "ImgSroll", loader: () => import("./pages/ImgSroll/ImgSroll") },
    { name: "Culture", loader: () => import("./pages/Culture/Culture") },
    { name: "History", loader: () => import("./pages/History/History") },
  ];

  //loading頁面
  const preloadPages = async () => {
    try {
      let totalLoadTime = 0;

      for (let i = 0; i < componentsToLoad.length; i++) {
        const startTime = performance.now();
        // 動態載入組件
        await componentsToLoad[i].loader();
        const endTime = performance.now();

        // 計算載入時間
        const loadTime = endTime - startTime;
        totalLoadTime += loadTime;

        // 更新進度
        const progress = ((i + 1) / componentsToLoad.length) * 100;
        setLoadingProgress(progress);
      }
      // 加載動畫至少1.2秒
      const finalDisplayTime = Math.max(totalLoadTime, 1200);

      setTimeout(() => {
        setIsLoading(false);
      }, finalDisplayTime - totalLoadTime);
    } catch (error) {
      // 執行載入錯誤
      console.log("error", error);
      setIsLoading(false);
    }
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
