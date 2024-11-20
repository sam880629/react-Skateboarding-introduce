
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Block1 = () => {
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 先將文字設置為隱藏狀態
    gsap.set([h1Ref.current, pRef.current], {
       clipPath: "inset(100% 0 0 0)"
    });

    const tl = gsap.timeline();

    tl.to(h1Ref.current, {
        clipPath: "inset(0 0 0 0)", // 完全顯示
        duration: 1,
        ease: "power4.out"
      })
      .to(pRef.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 1,
        ease: "power4.out"
      }, "-=0.5"); // 在前一個動畫完成前 0.5 秒開始

  }, []);

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
      <div  className="absolute z-10 inset-0 flex flex-col justify-center items-center text-gray-200  ">
        <h1
          ref={h1Ref}
          className="text-3xl md:text-6xl  lg:text-8xl mb-2 md:mb-6 text-center tracking-wider"
          style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
        >
          SKATE OR DIE
        </h1>
        <div className="max-w-2xl text-center space-y-4">
          <p
            ref={pRef}
            className="text-sm md:text-xl tracking-wide"
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
