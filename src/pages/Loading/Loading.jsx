import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NowLoading from "../../components/NowLoading";
import TransitionLeft from "../../components/TransitionLeft";
gsap.registerPlugin(ScrollTrigger);

// 載入畫面元件
const Loading = ({ loadingProgress, isLoading }) => {

  return isLoading ? <NowLoading loadingProgress={loadingProgress} /> : "" ;

};

export default Loading;
