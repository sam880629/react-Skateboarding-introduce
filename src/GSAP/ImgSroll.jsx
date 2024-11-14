import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImgScroll = () => {
  const wrapperRef = useRef(null);
  const mainImgRef = useRef(null);
  const leftImagesRef = useRef(null);
  const rightImgRef = useRef(null);
  const midTopImgRef = useRef(null);
  const midBottomImgRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mainImg = mainImgRef.current;
    const leftImages = leftImagesRef.current;
    const rightImg = rightImgRef.current;
    const midTopImg = midTopImgRef.current;
    const midBottomImg = midBottomImgRef.current; 

    // 創建時間軸動畫
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top", // 當元素頂部碰到視窗頂部時開始
        end: "+=100% ", // 向下滾動 100% 的視窗高度結束
        pin: true, 
        scrub: 0.3, // 平滑滾動效果
        markers: true, 
    
      }
    });

    // 設定動畫序列
    tl
      // 主圖片縮放置中
      .to(mainImg, {
        scale: 0.6,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
        duration: 1,
         ease: "power2.out"
      })
      // 側邊圖片顯示 (使用相同時間點開始)
      .to([leftImages, rightImg, midTopImg,midBottomImg], {
        opacity: 1,
        duration: 0.5,
         ease: "power2.out",
         delay: .5
      }, "<")
      .to(leftImages, {
        opacity: 1,
        y:30,
        duration: 1,
         ease: "power2.out",
       
      }, "<")
      .to(rightImg, {
        opacity: 1,
        y:-30,
        duration: 1,
         ease: "power2.out",
        
      }, "<")
      .to(leftImages, {
        opacity: 1,
        y:50,
        duration: 1,
         ease: "power2.out",
      }, "<+=0.8")
      .to(rightImg, {
        opacity: 1,
        y:-50,
        duration: 1,
         ease: "power2.out",
      
      },"<");

    // 清理函數
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <section 
        ref={wrapperRef} 
        className="relative w-full h-screen overflow-hidden"
      >
        {/* 主圖片 */}
        <img
          ref={mainImgRef}
          className="w-full h-screen object-cover"
          src="../src/images/skateBoard1.jpg"
          alt="Main skateboard"
          style={{ transform: 'translate(0, 0)' }} 
        />

        {/* 左側圖片組 */}
        <div 
          ref={leftImagesRef}
          className="absolute left-[-5%] top-[-25%] "
          style={{ opacity: 0 }} // 初始隱藏
        >
          <img
            className="  shadow-lg w-3/5 md:w-6/12"
             src="../src/images/skateBoard7.jpg"
            alt="Left top skateboard"
          />
          <img
            className="shadow-lg  w-3/5 md:w-6/12 mt-12"
            src="../src/images/skateBoard5.jpg"
            alt="Left bottom skateboard"
          />
        </div>

        {/* 右側圖片 */}
        <div
          ref={rightImgRef}
          className="absolute right-[-8%] bottom-[-40%] w-1/4"
          style={{ opacity: 0 }} 
        >
          <img
            className="w-full  shadow-lg"
            src="../src/images/skateBoard8.jpg"
            alt="Right skateboard"
          />
            <img
            className="w-full  shadow-lg mt-10"
           src="../src/images/skateBoard12.jpg"
            alt="Middle top skateboard"
          />
        </div>

        {/* 中間上方圖片 */}
        <div
          ref={midTopImgRef}
          className="absolute left-1/2 top-[0%]  -translate-x-1/2"
          style={{ opacity: 0 }} 
        >
          <img
            className=" shadow-lg"
           src="../src/images/skateBoard11.jpg"
            alt="Middle top skateboard"
          />
          
        </div>
         {/* 中間下方圖片 */}
         <div
          ref={midBottomImgRef}
          className="absolute left-1/2  -translate-x-1/2"
          style={{ opacity: 0 ,xPercent: -50,
            yPercent: -50,
            left: "50%",
            top: "85%", }} 
        >
          <img
            className="w-full  shadow-lg"
           src="../src/images/skateBoard9.jpg"
            alt="Middle top skateboard"
          />
          
        </div>
      </section>
    </div>
  );
};

export default ImgScroll;