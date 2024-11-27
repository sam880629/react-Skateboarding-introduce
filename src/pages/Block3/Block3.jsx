import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Block3 = () => {
  // References for images and text containers
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
 

  // Texts corresponding to each image
  const imageTexts = ["Park ", "Street ", "Racing"];

  const imagePaths = [
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/3.jpg",
  ];

  useEffect(() => {
    // 初始化文字的位置與透明度
    textRefs.current.forEach((text, index) => {
      if (index === 0) {
        gsap.set(text, { y: "0%", opacity: 1 });
      } else {
        gsap.set(text, { y: "100%", opacity: 0 });
      }
    });

    // 設置滾動動畫
    imageRefs.current.forEach((image, index) => {
      if (index > 0 && textRefs.current[index - 1]) {
        // 當前文字滑出
        gsap.fromTo(
          textRefs.current[index - 1],
          {
            y: "0%", // 初始位置
          },
          {
            y: "-10%", // 滑出至上方
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: image,
              start: "top center+=100",
              end: "+=150",
              toggleActions: "play none none reverse",
              scrub: true,
              immediateRender: false,
            //   markers: true,
            },
          }
        );
      }

      if (textRefs.current[index]) {
        gsap.fromTo(
          textRefs.current[index],
          {
            y: "10%",
          },
          {
            y: "0%", 
            opacity: 1, 
            duration: 0.5,
            scrollTrigger: {
              trigger: image,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
              immediateRender: false, 
              toggleActions: "play none none reverse",
            //   markers: true,
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="w-screen relative mt-10 mb-24">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="relative mb-14">
          <div
            className="sticky left-1/4 -translate-x-1/4 top-1/2 -translate-y-/4    text-white  rounded-lg overflow-hidden"
          >
            {imageTexts.map((text, index) => (
              <div
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={"text-4xl"}
              >
                {text}
              </div>
            ))}
          </div>

          {imagePaths.map((src, index) => (
            <div key={src} className=" ">
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={src}
                className={`
                  object-cover shadow-lg min-w-[21rem] h-[339px] 
                  ${index === 0 ? "rounded-t-xl" : ""} 
                  ${index === 2 ? "rounded-b-xl" : ""}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Block3;
