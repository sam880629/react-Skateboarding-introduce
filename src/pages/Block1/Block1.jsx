import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Block1 = () => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // 處理影片載入
  useEffect(() => {
    const video = videoRef.current;

    // 設定初始狀態 - 隱藏文字
    gsap.set([contentRef.current, titleRef.current], {
      clipPath: "inset(100% 0 0 0)",
    });

    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
    };

    // 檢查影片是否已經可以播放
    if (video.readyState >= 3) {
      handleVideoLoad();
    } else {
      video.addEventListener("canplay", handleVideoLoad);
    }

    return () => {
      video.removeEventListener("canplay", handleVideoLoad);
    };
  }, []);

  // 處理文字動畫
  useEffect(() => {
    if (!isVideoLoaded) return;

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      clipPath: "inset(0 0 0 0)",
      duration: 1,
      ease: "power4.out",
    }).to(
      contentRef.current,
      {
        clipPath: "inset(0 0 0 0)",
        duration: 1,
        ease: "power4.out",
      },
      "-=0.5"
    );
  }, [isVideoLoaded]); // 當 isVideoLoaded 變為 true 時觸發動畫

  return (
    <div className="w-screen h-screen page-hero  relative">
      {/* 影片設定 */}
      <video
        ref={videoRef}
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
          ref={titleRef}
          className="text-6xl md:text-6xl lg:text-8xl xl:text-9xl 
                   mb-2 md:mb-6 text-center tracking-wider break-words
                   md:whitespace-nowrap
                   flex flex-col md:flex-row items-center"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          <span className="block md:inline">SKATE</span>
          <span className="block md:inline my-4 md:mx-8 text-gray-300">OR</span>
          <span className="block md:inline">DIE</span>
        </h1>
        <div className="max-w-2xl text-center space-y-4 mt-4 md:mt-0">
          <p
            ref={contentRef}
            className="text-sm md:text-xl lg:text-2xl tracking-wide"
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
