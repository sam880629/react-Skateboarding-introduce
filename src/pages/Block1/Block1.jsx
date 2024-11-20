
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Block1 = () => {




  return (
    <div className="w-screen h-screen page-hero  relative">
      {/* 影片設定 */}
      <video
        className="w-full h-full object-cover"
        width="1920"
        height="1080"
        muted
        autoPlay
        loop
        playsInline
        disableRemotePlayback
        src="/assets/videos/blockVideo1.mp4"
        data-src="/assets/videos/blockVideo2.mp4"
        data-src-mobile="/assets/videos/blockVideo2.mp4"
      />
      {/* 內容 */}
      <div className="absolute z-10 inset-0 flex flex-col justify-center items-center text-gray-200">
        <h1
          className="text-8xl mb-6 text-center tracking-wider"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          SKATE OR DIE
        </h1>
        <div className="max-w-2xl text-center space-y-4">
          <p
            className="text-xl tracking-wide"
            style={{ fontFamily: "'Teko', sans-serif" }}
          >
            "Life is like skateboarding... It's all about getting up when you
            fall"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Block1;
