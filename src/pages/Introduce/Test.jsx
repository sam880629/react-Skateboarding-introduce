import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 1,
    title: "Origins of Skateboarding",
    time:"1940s and 1950s",
    description:
      "Skateboarding originated in California in the 1940s and 1950s when surfers wanted to recreate the feeling of surfing on land. They attached wheels to wooden planks, creating the earliest form of skateboards, often referred to as 'sidewalk surfing.' Initially handmade and simple, skateboards soon grew in popularity among Californian youth, and by the 1960s, skateboarding became commercialized and spread as a popular pastime.",
    image: "/assets/images/skateboard.jpg",
  },
  {
    id: 2,
    title: "Alan Gelfand's 'Ollie' Trick",
    time:"1978",
    description:
      "Alan Gelfand invented the 'ollie,' the first skateboarding trick where the skateboarder can jump without using their hands. The ollie became the foundation for countless aerial tricks and marked a new era in skateboarding. This revolutionary trick made it possible to perform intricate maneuvers on flat ground and led to the rise of modern skateboarding.",
    image: "/assets/images/Ollie.jpg",
  },
  {
    id: 3,
    title: "X Games Launch",
    time:"1995",
    description:
      "The X Games, organized by ESPN, were first held in 1995 and included skateboarding as one of its core events. This brought skateboarding to a global audience, boosting its popularity significantly. The competition showcased the best skateboarders and their innovative tricks, establishing skateboarding as a professional sport and exposing it to millions of viewers worldwide.",
    image: "/assets/images/Xgames.jpg",
  },
  {
    id: 4,
    title: "Skateboarding Enters the Olympics",
    time:"2021",
    description:
      "Skateboarding debuted as an official Olympic sport at the 2021 Tokyo Olympics, marking its recognition by the global sports community. The inclusion in the Olympics elevated skateboarding’s legitimacy and professional standing, bringing greater attention to the sport and inspiring a new generation of skaters worldwide.",
    image: "/assets/images/Olympics.jpg",
  },
];

const ScrollSection = () => {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const textSections = gsap.utils.toArray(".text-section");
    const images = gsap.utils.toArray(".image-section");

    // 設置圖片容器的固定效果
    ScrollTrigger.create({
      trigger: imageContainerRef.current,
      pin: true,
      pinSpacing: false,
      start: "top top",
      end: () => `+=${containerRef.current.offsetHeight}`,
    });

    // 為每個section設置動畫
    textSections.forEach((section, i) => {
      const image = images[i];

      // 圖片切換動畫
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

      // 文字動畫
      gsap.from(section, {
        opacity: 1,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top center+=100",
          end: "top center",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* 主容器 */}
      <div className="flex">
        {/* 左側文字容器 */}
        <div className="w-1/2 relative bg-[#333]">
          {sections.map((section) => (
            <div
              key={section.id}
              className="text-section h-screen flex items-center bg-[#333]"
            >
              <div className="p-16 max-w-xl">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl text-[#ccc] leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右側圖片容器 */}
        <div ref={imageContainerRef} className="w-1/2 h-screen bg-[#333]">
          <div className="relative h-full ">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={` image-section absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-contain"
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

export default ScrollSection;
