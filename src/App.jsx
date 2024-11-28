import "./App.css";
import { ParallaxProvider } from "react-scroll-parallax";
import NavBar from "./Header/NavBar";
import ImgSroll from "./pages/ImgSroll/ImgSroll";
import Main from "./pages/Main/Main";
import Culture from "./pages/Culture/Culture";
import Categories from "./pages/Categories/Categories";
import About from "./pages/About/About";
import History from "./pages/History/History";

const App = () => {
  return (
    <ParallaxProvider>
      <div className="App">
        <NavBar />
        <Main />
        <About />
        <Categories />
        <ImgSroll />
        <Culture />
        <History />
      </div>
    </ParallaxProvider>
  );
};

export default App;
