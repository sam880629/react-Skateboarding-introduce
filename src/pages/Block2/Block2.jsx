import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Block2 = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const borderRef = useRef(null);
  const imgRef = useRef(null);
  const pathRef = useRef(null);
  const path2Ref = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  useEffect(() => {
    // 獲取SVG路徑長度
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }

    const tl = gsap.timeline();

    // 文字動畫
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

    // 線條動畫
    gsap.fromTo(
      borderRef.current,
      { height: "0%" },
      {
        height: "100%",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          ease: "none",
          duration: 1,
          // markers: true,
        },
      }
    );

    gsap.fromTo(
      [pathRef.current, path2Ref.current],
      {
        strokeDasharray: pathLength, // 設置路徑的總長度
        strokeDashoffset: pathLength, // 從路徑總長度開始隱藏
      },
      {
        strokeDashoffset: 0, // 路徑完全顯示
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top center", // 當滾動到目標時開始動畫
          once: true, // 動畫僅執行一次
        },
        onComplete: () => {
          // 確保在動畫結束後，移除遮罩
          img2Ref.current.removeAttribute("mask"); // 移除 mask 屬性
          img3Ref.current.removeAttribute("mask"); // 移除 mask 屬性
        },
      }
    );
  }, [pathLength]);

  return (
  
      <div
        ref={contentRef}
        className="w-screen h-screen flex  flex-col justify-center items-center relative mt-10 md:mt-20 px-8 lg:px-24"
      >
        <div className="flex h-full  justify-center items-center ">
          {/* 線條 */}
          <div
            ref={borderRef}
            className="w-4/12 h-full border-r-4 border-gray-200"
            style={{
              height: "0%",
            }}
          ></div>

          {/* 文字內容 */}
          <div className="w-full lg:w-8/12 z-10 inset-0 flex flex-col justify-start items-start text-gray-200 px-4 md:px-24">
            <h1
              ref={titleRef}
              className="w-full text-sm lg:text-3xl mb-2 md:mb-6  text-left font-bold"
            >
              Skateboarding culture is deeply intertwined with graffiti and
              street art. Skaters often navigate urban environments, where their
              favorite spots are frequently adorned with vibrant graffiti and
              creative street murals
            </h1>
          </div>
        </div>
        {/* 圖片與塗鴉效果 */}
        <div ref={imgRef} className=" w-full  h-full  flex flex-col md:flex-row gap-4 md:gpa-0 mx-auto  mb-10 md:mb-24">
          <div className="relative w-full h-full">
            {/* SVG 遮罩 */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 900 600"
            >
              <defs>
                <mask id="graffiti-mask">
                  <path
                    ref={pathRef}
                    d="M255.065 75.8473C280.258 75.8473 306.791 73.4058 331.398 79.4143C394.125 94.7314 457.674 108.664 521.874 116.035C609.082 126.048 696.577 132.269 783.69 143.382C881.335 155.839 978.937 167.996 1076.66 179.765C1118.29 184.779 1159.29 195.698 1201.38 195.698C1203.52 195.698 1209.94 195.698 1207.8 195.698C1195.24 195.698 1180.16 200.632 1168.45 203.188C1117.84 214.229 1067.17 224.9 1015.54 229.941C960.479 235.317 904.926 234.221 849.679 234.221C750.108 234.221 650.189 231.902 550.648 234.696C491.688 236.352 431.761 248.291 373.488 257.287C350.03 260.909 327.286 266.199 304.289 271.793C293.322 274.46 283.45 277.124 272.899 281.305C265.501 284.236 257.877 286.947 250.309 289.39C239.607 292.845 221.759 294.146 247.455 294.146C415.599 294.146 583.811 292.631 751.944 294.503C818.276 295.241 884.305 300.567 950.624 300.567C992.212 300.567 1033.85 304.614 1074.4 314.478C1082.53 316.455 1058.53 320.112 1050.26 321.374C993.387 330.05 936.14 336.02 879.047 343.014C713.946 363.236 549.697 397.588 383.238 404.722C349.824 406.154 313.525 401.016 280.509 407.814C251.373 413.812 221.369 422.525 193.95 433.971C179.347 440.068 200.008 437.521 205.127 437.538C252.368 437.696 299.614 437.261 346.855 437.538C428.027 438.015 508.791 440.93 589.409 451.093C660.11 460.006 730.175 473.495 800.811 482.958C869.756 492.194 937.364 495.323 1006.74 495.323C1006.96 495.323 1023.92 493.609 1015.54 496.274C987.544 505.183 964.511 526.969 937.783 539.197C863.452 573.202 778.347 587.32 698.558 600.906C599.311 617.804 501.237 625.874 400.716 625.874C332.584 625.874 264.749 622.721 196.685 621.713C165.523 621.251 132.662 618.814 102.279 626.944C98.2064 628.034 77.3855 630.749 75.8837 635.505C74.7199 639.191 179.227 651.891 180.396 652.032C402.582 678.843 625.171 704.336 848.133 723.847C908.382 729.12 968.436 730.595 1028.86 730.743C1046.29 730.786 1063.8 730.076 1081.18 731.813C1099.74 733.67 1123.88 731.423 1141.1 737.164"
                    fill="none"
                    stroke="white"
                    strokeWidth="150"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
              </defs>
              <image
                ref={img2Ref}
                href="/assets/images/Graffiti.jpeg"
                className="w-full h-full rounded"
                mask="url(#graffiti-mask)"
              />
            </svg>
          </div>
          <div className="relative w-full h-full">
            {/* SVG 遮罩 */}
            <svg
              className="absolute inset-0 w-full h-full rounded-xl"
              viewBox="0 0 900 600"
            >
              <defs>
                <mask id="graffiti-mask">
                  <path
                    ref={path2Ref}
                     d="M255.065 75.8473C280.258 75.8473 306.791 73.4058 331.398 79.4143C394.125 94.7314 457.674 108.664 521.874 116.035C609.082 126.048 696.577 132.269 783.69 143.382C881.335 155.839 978.937 167.996 1076.66 179.765C1118.29 184.779 1159.29 195.698 1201.38 195.698C1203.52 195.698 1209.94 195.698 1207.8 195.698C1195.24 195.698 1180.16 200.632 1168.45 203.188C1117.84 214.229 1067.17 224.9 1015.54 229.941C960.479 235.317 904.926 234.221 849.679 234.221C750.108 234.221 650.189 231.902 550.648 234.696C491.688 236.352 431.761 248.291 373.488 257.287C350.03 260.909 327.286 266.199 304.289 271.793C293.322 274.46 283.45 277.124 272.899 281.305C265.501 284.236 257.877 286.947 250.309 289.39C239.607 292.845 221.759 294.146 247.455 294.146C415.599 294.146 583.811 292.631 751.944 294.503C818.276 295.241 884.305 300.567 950.624 300.567C992.212 300.567 1033.85 304.614 1074.4 314.478C1082.53 316.455 1058.53 320.112 1050.26 321.374C993.387 330.05 936.14 336.02 879.047 343.014C713.946 363.236 549.697 397.588 383.238 404.722C349.824 406.154 313.525 401.016 280.509 407.814C251.373 413.812 221.369 422.525 193.95 433.971C179.347 440.068 200.008 437.521 205.127 437.538C252.368 437.696 299.614 437.261 346.855 437.538C428.027 438.015 508.791 440.93 589.409 451.093C660.11 460.006 730.175 473.495 800.811 482.958C869.756 492.194 937.364 495.323 1006.74 495.323C1006.96 495.323 1023.92 493.609 1015.54 496.274C987.544 505.183 964.511 526.969 937.783 539.197C863.452 573.202 778.347 587.32 698.558 600.906C599.311 617.804 501.237 625.874 400.716 625.874C332.584 625.874 264.749 622.721 196.685 621.713C165.523 621.251 132.662 618.814 102.279 626.944C98.2064 628.034 77.3855 630.749 75.8837 635.505C74.7199 639.191 179.227 651.891 180.396 652.032C402.582 678.843 625.171 704.336 848.133 723.847C908.382 729.12 968.436 730.595 1028.86 730.743C1046.29 730.786 1063.8 730.076 1081.18 731.813C1099.74 733.67 1123.88 731.423 1141.1 737.164"
                    fill="none"
                    stroke="white"
                    strokeWidth="150"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
              </defs>
              <image
                ref={img3Ref}
                href="/assets/images/Graffiti2.jpeg"
                className="w-full h-full rounded-xl"
                mask="url(#graffiti-mask)"
              />
            </svg>
          </div>
        </div>
      </div>
   
  );
};

export default Block2;
