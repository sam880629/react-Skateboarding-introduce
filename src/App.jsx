import "./App.css";
import { ParallaxProvider } from "react-scroll-parallax";
import NavBar from "./Header/NavBar";
import ImgSroll from "./pages/ImgSroll/ImgSroll";
import Block1 from "./pages/Block1/Block1";
import About from "./pages/About/About";

import History from "./pages/History/History";
const App = () => {
  return (
    <ParallaxProvider>
      <div className="App">
        <NavBar />
      
        <Block1 />
        <About />
        <ImgSroll />
        <History />
       
  
      </div>
    </ParallaxProvider>
  );
};

export default App;
