import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef,  } from "react";

gsap.registerPlugin(ScrollTrigger);
// 載入畫面元件
const NowLoading = ({ loadingProgress }) => {

  const loadingRef = useRef(null);

  return (
    <div
      ref={loadingRef}
      className="fixed h-full inset-0 flex items-center justify-center bg-[#222] z-50 mx-auto"
    >
        <div className="max-w-72">
          {/* GIF */}
          <iframe
            className="w-full"
            src="https://giphy.com/embed/2XskdWOosyAWPGTMv8A"
            allowFullScreen
          ></iframe>
          {/* 進度條 */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 mt-10">
            <div
              className="bg-[#00c475] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          {/* 顯示進度 */}
          <p className="text-gray-200 text-center font-bold">
            Loading... ({loadingProgress.toFixed(0)}%)
          </p>
        </div>
   
    </div>
  );
}

export default NowLoading;
