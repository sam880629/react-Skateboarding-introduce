import './App.css'
import { ParallaxProvider } from "react-scroll-parallax";
import NavBar from "./Header/NavBar";
import  ImgSroll from "./pages/ImgSroll/ImgSroll"
import Block1 from './pages/Block1/Block1';
import Introduce from './pages/Introduce/Introduce';
import Test from './pages/Introduce/Test';
const App = ()=> {
  return (
    <ParallaxProvider>
      <div className="App">
        <NavBar />
        <Block1 />
        <ImgSroll />
        <Introduce />
        <Test></Test>
      </div>
    </ParallaxProvider>
  );
}

export default App
