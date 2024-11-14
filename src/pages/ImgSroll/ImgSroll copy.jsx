import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImgScroll = () => {
  const imgRef = useRef(null);
  const leftImageRef = useRef(null);
  const midTopImageRef = useRef(null);
  const midBottomImageRef = useRef(null);
  const rightImageRef = useRef(null);
  useEffect(() => {
    // 設定動畫
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrapper", //觸發的元素
        start: "top center", //觸發的開始位置
        end: "+=2000px 70%", //觸發的結束位置
        scrub: 0.3,
        pin: "#wrapper",
        markers: true,
         ease: "power1.out",
         toggleActions: "play none none reverse"
      },
    });

    tl.to(imgRef.current, {
      scale: 0.5,
      yPercent: -50,
      transformOrigin: "center center",
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrapper2", //觸發的元素
        start: "top center", //觸發的開始位置
        end: "+=1500px 70%", //觸發的結束位置
        scrub: 0.5,
        pin: "#wrapper2",
        markers: true,
         ease: "power1.out",
         toggleActions: "play none none reverse"
      },
    });

    // 左邊圖片
    tl2.fromTo(
      leftImageRef.current,
      { opacity: 0, y: 0, position: "absolute", left: "-20px", bottom: "0px" },
      { opacity: 1, y: 0, position: "absolute", left: "-20px", bottom: "40px" },
      0
    );
    // 右邊圖片
    tl2.fromTo(
        rightImageRef.current,
        { opacity: 0, y: 0, position: "absolute", right: "0px", bottom: "0px" },
        { opacity: 1, y: 0, position: "absolute", right: "0px", bottom: "100px" },
        0
      );
    // 中間的上半部分圖片
    tl2.fromTo(
      midTopImageRef.current,
      {
        opacity: 0,
        position: "absolute",
        left: "25%",
        top: "0px",
        yPercent: -50,
      },
      {
       
        opacity: 1,
        position: "absolute",
        left: "25%",
        top: "150px",
        yPercent: -50,
      },
      0
    );

    // 中間的下半部分圖片
    tl2.fromTo(
      midBottomImageRef.current,
      {
        opacity: 0,
        y: 0,
        position: "absolute",
        left: "25%",
        bottom: "0px",
        yPercent: -50,
      },
      {
        opacity: 1,
        y: 0,
        position: "absolute",
        left: "25%",
        bottom: "240px",
        yPercent: -280,
      },
      0
    );
    return () => {
      tl.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section id="wrapper" className="relative ">
      <img
        ref={imgRef}
        className="w-full rounded"
        src="../src/images/skateBoard1.jpg"
        alt=""
      />
      <section id="wrapper2" className=" relative">
        <div ref={leftImageRef} className="">
          <img
            className=" rounded "
            src="../src/images/skateBoard7.jpg"
            style={{ width: 300 }}
          />
          <img
            className=" rounded mt-16"
            src="../src/images/skateBoard5.jpg"
            style={{ width: 300 }}
          />
        </div>
        <div ref={midTopImageRef}>
          <img
            className="rounded"
            src="../src/images/skateBoard9.jpg"
            style={{ scale: 0.5 }}
          />
        </div>
        {/* 右邊圖片 */}
        <div ref={rightImageRef}>
          <img
            className="rounded"
            src="../src/images/skateBoard8.jpg"
            style={{ width: 350 }}
          />
        </div>
        {/* 中間圖片的下半部分 */}
        <div ref={midBottomImageRef}>
            <img
            className="rounded"
            src="../src/images/skateBoard11.jpg"
            style={{ scale: 0.5 }}
            />
        </div>
      </section>
     
    </section>
  );
};

export default ImgScroll;
