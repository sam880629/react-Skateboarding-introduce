import './App.css'
import { ParallaxProvider } from "react-scroll-parallax";
import NavBar from "./Header/NavBar";
import  ImgSroll from "./pages/ImgSroll/ImgSroll"
import Block1 from './pages/Block1/Block1';
import Introduce from './pages/Introduce/Introduce';
import History from './pages/History/History';
const App = ()=> {
  return (
    <ParallaxProvider>
      <div className="App">
        <NavBar />
        <Block1 />
        <ImgSroll />
        <Introduce />
        <History/>
      </div>
    </ParallaxProvider>
  );
}

export default App
