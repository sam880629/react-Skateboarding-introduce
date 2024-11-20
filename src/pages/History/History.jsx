import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './History.css'

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 1,
    title: "Origins of Skateboarding",
    time: "1940s and 1950s",
    description:
      "Skateboarding originated in California in the 1940s and 1950s when surfers wanted to recreate the feeling of surfing on land. They attached wheels to wooden planks, creating the earliest form of skateboards, often referred to as 'sidewalk surfing.' Initially handmade and simple, skateboards soon grew in popularity among Californian youth, and by the 1960s, skateboarding became commercialized and spread as a popular pastime.",
    image: "/assets/images/skateboard.jpg",
    style: { objectPosition: "center" }
  },
  {
    id: 2,
    title: "Alan Gelfand's 'Ollie' Trick",
    time: "1978",
    description:
      "Alan Gelfand invented the 'ollie,' the first skateboarding trick where the skateboarder can jump without using their hands. The ollie became the foundation for countless aerial tricks and marked a new era in skateboarding. This revolutionary trick made it possible to perform intricate maneuvers on flat ground and led to the rise of modern skateboarding.",
    image: "/assets/images/Ollie.jpg",
    style: { objectPosition: "top" }
  },
  {
    id: 3,
    title: "X Games Launch",
    time: "1995",
    description:
      "The X Games, organized by ESPN, were first held in 1995 and included skateboarding as one of its core events. This brought skateboarding to a global audience, boosting its popularity significantly. The competition showcased the best skateboarders and their innovative tricks, establishing skateboarding as a professional sport and exposing it to millions of viewers worldwide.",
    image: "/assets/images/Xgames.jpg",
    style: { objectPosition: "top" }
  },
  {
    id: 4,
    title: "Skateboarding Enters the Olympics",
    time: "2021",
    description:
      "Skateboarding debuted as an official Olympic sport at the 2021 Tokyo Olympics, marking its recognition by the global sports community. The inclusion in the Olympics elevated skateboarding's legitimacy and professional standing, bringing greater attention to the sport and inspiring a new generation of skaters worldwide.",
    image: "/assets/images/Olympics2.jpg",
    style: { objectPosition: "top" }
  },
];

const History = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const textSections = gsap.utils.toArray(".text-section");
    const images = gsap.utils.toArray(".image-section");
  
    if (isMobile) {
      // 設定垂直滾動驅動水平移動
      const totalScroll = textSections.length * 100; // 總滾動距離

      // 固定文字容器
      ScrollTrigger.create({
        trigger: textContainerRef.current,
        pinSpacing: true,
        start: "top top",
        pin: true,
        end: `+=${totalScroll}vh`,
      });

      // 水平移動動畫
      gsap.to(".text-track", {
        x: () => -(textContainerRef.current.scrollWidth- window.innerWidth),
       
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}vh`,
          scrub: 0.1,
          invalidateOnRefresh: true,
          // pin: true,
          // markers: true
        }
      },'+=0.5');
     
      // 圖片切換動畫
      textSections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `${i * 100}vh top`,
          end: `${(i + 1) * 100}vh top`,
          onEnter: () => {
            gsap.to(images, { opacity: 0, duration: 0.3 });
            gsap.to(images[i], { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(images, { opacity: 0, duration: 0.3 });
            gsap.to(images[i], { opacity: 1, duration: 0.3 });
          },
        });
      });
     
    } else {
      // 桌面版
      ScrollTrigger.create({
        trigger: imageContainerRef.current,
        pin: true,
        pinSpacing: false,
        start: "top top",
        end: () => `+=${containerRef.current.offsetHeight}`,
      });

      textSections.forEach((section, i) => {
        const image = images[i];

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(images, { opacity: 0, duration: 0.3 });
            gsap.to(image, { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(images, { opacity: 0, duration: 0.3 });
            gsap.to(image, { opacity: 1, duration: 0.3 });
          },
        });

        gsap.to(section, {
          display: "flex",
          opacity: 1,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "top center",
            toggleActions: "play none none reverse",
            scrub: 1,
            ease: "power2.out",
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#333]">
      <div className="flex flex-col md:flex-row">
        {/* 文字區塊容器 */}
        <div 
          ref={textContainerRef}
          className="historyText-div relative w-full md:w-1/2 overflow-hidden"
        >
          {/* 水平滾動軌道 */}
          <div className="text-track flex md:block">
            {sections.map((section) => (
              <div
                key={section.id}
                className="text-section min-w-[100vw] md:min-w-0 h-[50vh] md:h-screen flex items-center md:opacity-0"
              >
                <div className="p-6 md:p-10">
                  <h2 className="text-2xl md:text-5xl font-black text-gray-400 mb-4 md:mb-6">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-xl text-[#ccc]">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 圖片區塊 */}
        <div 
          ref={imageContainerRef} 
          className="historyImg-div h-[50vh] md:h-screen w-full md:w-1/2 sticky bottom-0 md:relative"
        >
          <div className="relative h-full">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`w-full rounded-xl image-section absolute inset-0  h-full transition-opacity duration-500 ease-in-out ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                  style={section.style}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default History;