import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const FullPageScroll = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const StartRef = useRef(null);
  const sections = [
    {
      id: 1,
      title: "Origins of Skateboarding",
      time: "1940s and 1950s",
      description:
        "Skateboarding originated in California in the 1940s and 1950s when surfers wanted to recreate the feeling of surfing on land. They attached wheels to wooden planks, creating the earliest form of skateboards, often referred to as 'sidewalk surfing.' Initially handmade and simple, skateboards soon grew in popularity among Californian youth, and by the 1960s, skateboarding became commercialized and spread as a popular pastime.",
      image: "/assets/images/skateboard.jpg",
      style: { objectPosition: "center" },
    },
    {
      id: 2,
      title: "Alan Gelfand's 'Ollie' Trick",
      time: "1978",
      description:
        "Alan Gelfand invented the 'ollie,' the first skateboarding trick where the skateboarder can jump without using their hands. The ollie became the foundation for countless aerial tricks and marked a new era in skateboarding. This revolutionary trick made it possible to perform intricate maneuvers on flat ground and led to the rise of modern skateboarding.",
      image: "/assets/images/Ollie.jpg",
      style: { objectPosition: "top" },
    },
    {
      id: 3,
      title: "X Games Launch",
      time: "1995",
      description:
        "The X Games, organized by ESPN, were first held in 1995 and included skateboarding as one of its core events. This brought skateboarding to a global audience, boosting its popularity significantly. The competition showcased the best skateboarders and their innovative tricks, establishing skateboarding as a professional sport and exposing it to millions of viewers worldwide.",
      image: "/assets/images/Xgames.jpg",
      style: { objectPosition: "top" },
    },
    {
      id: 4,
      title: "Skateboarding Enters the Olympics",
      time: "2021",
      description:
        "Skateboarding debuted as an official Olympic sport at the 2021 Tokyo Olympics, marking its recognition by the global sports community. The inclusion in the Olympics elevated skateboarding's legitimacy and professional standing, bringing greater attention to the sport and inspiring a new generation of skaters worldwide.",
      image: "/assets/images/Olympics2.jpg",
      style: { objectPosition: "top" },
    },
  ];

  useEffect(() => {
    const sectionsArray = gsap.utils.toArray(".section");
    let scrollTimeout;
    
    document.body.style.overflow = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        
        if (entry.isIntersecting) {
          setIsFixed(true);
          console.log("scroll");
        } else {
          setIsFixed(false);
          console.log("no-scroll");
        }
      },
      { threshold: 0.8 }
    );

   observer.observe(StartRef.current);
    
    const scrollToSection = (index) => {
      if (isScrolling.current) return;

      if (index >= 0 && index < sections.length) {
        isScrolling.current = true;
        setCurrentSection(index);

        // 動畫過渡效果
        gsap.to(containerRef.current, {
          duration: 0.8,
          y: -index * window.innerHeight,
          ease: "power2.out",
          onComplete: () => {
            isScrolling.current = false;
          },
        });

        // 淡入淡出圖片
        sectionsArray.forEach((section, i) => {
          const img = section.querySelector(".image-section");
          gsap.to(img, {
            duration: 0.6,
            opacity: i === index ? 1 : 0,
            ease: "power2.inOut",
          });
        });
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = currentSection + direction;
        if (nextSection >= 0 && nextSection < sections.length) {
          scrollToSection(nextSection);
        }
      }, 50);
    };

    const handleResize = () => {
      gsap.to(containerRef.current, {
        duration: 0,
        y: -currentSection * window.innerHeight,
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, [currentSection, sections.length]);

  return (
    <div ref={StartRef} className="h-screen block  w-full top-0 left-0">
      {/* 導航點 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
        {sections.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-white my-2 cursor-pointer transition-transform duration-300"
            style={{
              transform: currentSection === index ? "scale(1.5)" : "scale(1)",
              opacity: currentSection === index ? 1 : 0.5,
            }}
            onClick={() => {
              if (!isScrolling.current) {
                setCurrentSection(index);
                gsap.to(containerRef.current, {
                  duration: 0.8,
                  y: -index * window.innerHeight,
                  ease: "power2.out",
                });
              }
            }}
          />
        ))}
      </div>

      {/* 內容區域 */}
      <div ref={containerRef} className="relative f h-full w-full touch-none">
        {sections.map((section, index) => (
          <section
            key={section.id}
            className="section h-screen w-full flex justify-center items-center relative"
          >
            {/* 背景圖片 */}
            <div
              className={`rounded-xl image-section absolute inset-0 h-full transition-opacity duration-500 ease-in-out ${
                index === currentSection ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover"
                style={section.style}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
            </div>

            {/* 文字內容 */}
            <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-10">
              <div className="text-xl md:text-2xl text-gray-400 mb-2">
                {section.time}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                {section.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FullPageScroll;
