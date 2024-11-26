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
          start: "top 60%",
          end: "bottom 60%",
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
        strokeDasharray: pathLength, 
        strokeDashoffset: pathLength, 
      },
      {
        strokeDashoffset: 0, // 路徑完全顯示
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center", // 當滾動到目標時開始動畫
          once: true, // 動畫僅執行一次
        },
        onComplete: () => {
          //移除遮罩
          img2Ref.current.removeAttribute("mask");
          img3Ref.current.removeAttribute("mask");
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
            className="text-[#00cf75] mt-5 md:mb-4 sm:mb-1 sm:mt-0 text-3xl md:text-4xl lg:text-6xl"
            style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
          >
            Skateboarding culture
          </h1>
          <h1
            ref={titleRef}
            className="w-full text-sm lg:text-3xl mb-2 md:mb-6  text-left font-bold"
          >
            is deeply intertwined with graffiti and street art. Skaters often
            navigate urban environments, where their favorite spots are
            frequently adorned with vibrant graffiti and creative street murals
          </h1>
        </div>
      </div>
      {/* 圖片與塗鴉效果 */}
      <div
        ref={imgRef}
        className=" w-full  h-full  flex flex-col md:flex-row gap-4 md:gpa-0 mx-auto  mb-10 md:mb-24 md:mt-10"
      >

        <div className="relative w-full h-full">
          {/* SVG 遮罩 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 600">
            <defs>
              <mask id="graffiti-mask">
                <path
                  ref={pathRef}
                  d="M151 294.716C205.593 263.306 263.608 240.325 321.01 216.988C353.827 203.645 387.068 191.709 420.008 178.778C440.354 170.79 461.887 167.044 482.04 158.975C488.66 156.325 494.951 150.252 502.094 150.252C509.777 150.252 517.459 150.252 525.141 150.252C528.778 150.252 533.024 149.686 536.665 150.252C541.254 150.965 531.661 159.471 528.284 163.163C496.893 197.472 461.299 226.672 428.164 258.6C404.146 281.743 381.277 305.829 359.472 331.791C336.523 359.114 314.674 387.205 289.657 412.049C265.383 436.156 239.457 457.945 214.604 481.228C204.903 490.316 193.808 498.091 184.373 507.399C163.689 527.804 230.029 473.362 252.916 456.453C291.877 427.669 332.165 402.108 374.213 379.946C441.426 344.52 511.217 319.197 581.487 293.669C629.215 276.329 677.896 256.687 721.491 227.543C732.886 219.925 744.03 211.892 755.538 204.513C771.711 194.142 723.171 225.316 707.797 237.227C675.7 262.093 644.731 288.853 614.037 316.001C561.069 362.851 507.741 409.687 456.599 459.244C419.126 495.555 384.915 535.976 348.547 573.699C333.832 588.962 317.555 601.981 302.452 616.707C292.749 626.168 283.007 635.184 272.596 643.575C266.366 648.596 260.209 653.758 253.814 658.493C252.038 659.808 240.951 666.015 251.27 663.204C266.081 659.168 280.284 652.357 294.371 645.844C326.289 631.086 358.101 616.566 390.75 604.057C494.37 564.357 600.181 532.857 703.831 493.179C742.038 478.553 780.134 463.723 818.468 449.561C837.084 442.683 854.973 435.017 872.793 425.745C879.167 422.429 885.782 421.493 892.249 418.766C899.487 415.714 881.991 434.112 881.324 434.992C853.776 471.369 821.894 502.549 790.183 533.832C751.612 571.881 711.892 608.06 671.655 643.663C656.546 657.032 641.579 670.03 625.112 681"
                  fill="none"
                  stroke="white"
                  strokeWidth="300"
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
                  d="M151 294.716C205.593 263.306 263.608 240.325 321.01 216.988C353.827 203.645 387.068 191.709 420.008 178.778C440.354 170.79 461.887 167.044 482.04 158.975C488.66 156.325 494.951 150.252 502.094 150.252C509.777 150.252 517.459 150.252 525.141 150.252C528.778 150.252 533.024 149.686 536.665 150.252C541.254 150.965 531.661 159.471 528.284 163.163C496.893 197.472 461.299 226.672 428.164 258.6C404.146 281.743 381.277 305.829 359.472 331.791C336.523 359.114 314.674 387.205 289.657 412.049C265.383 436.156 239.457 457.945 214.604 481.228C204.903 490.316 193.808 498.091 184.373 507.399C163.689 527.804 230.029 473.362 252.916 456.453C291.877 427.669 332.165 402.108 374.213 379.946C441.426 344.52 511.217 319.197 581.487 293.669C629.215 276.329 677.896 256.687 721.491 227.543C732.886 219.925 744.03 211.892 755.538 204.513C771.711 194.142 723.171 225.316 707.797 237.227C675.7 262.093 644.731 288.853 614.037 316.001C561.069 362.851 507.741 409.687 456.599 459.244C419.126 495.555 384.915 535.976 348.547 573.699C333.832 588.962 317.555 601.981 302.452 616.707C292.749 626.168 283.007 635.184 272.596 643.575C266.366 648.596 260.209 653.758 253.814 658.493C252.038 659.808 240.951 666.015 251.27 663.204C266.081 659.168 280.284 652.357 294.371 645.844C326.289 631.086 358.101 616.566 390.75 604.057C494.37 564.357 600.181 532.857 703.831 493.179C742.038 478.553 780.134 463.723 818.468 449.561C837.084 442.683 854.973 435.017 872.793 425.745C879.167 422.429 885.782 421.493 892.249 418.766C899.487 415.714 881.991 434.112 881.324 434.992C853.776 471.369 821.894 502.549 790.183 533.832C751.612 571.881 711.892 608.06 671.655 643.663C656.546 657.032 641.579 670.03 625.112 681"
                  fill="none"
                  stroke="white"
                  strokeWidth="300"
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
