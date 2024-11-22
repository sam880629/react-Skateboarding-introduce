import ToutContent from "../../components/ToutContent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const wrapperRef = useRef(null);
  const cont1Ref = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cont1 = cont1Ref.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top +=100%",
        end: "bottom 100%",
        scrub: 1,
        // markers: true,
      },
    });
    tl.from(cont1, {
      opacity: 0,
      duration: 1,
      y: "50",
      ease: "power2.out",
    });
    tl.to(cont1, {
      opacity: 1,
      duration: 1,
      y: "0",
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const header = "About   Skateboarding";
  const content =
    "Skateboarding is a thrilling and dynamic sport that combines elements of art, athleticism, and creativity. It has grown from a niche activity into a global cultural phenomenon, influencing fashion, music, and lifestyles around the world.";

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen md:h-[150vh] lg:h-screen overflow-hidden flex flex-col lg:flex-row   justify-center items-center  px-8  py-20 md:pt-32 lg:py-24 md:px-10"
    >
      {/* 左側文字 */}
      <ToutContent
        className="w-full h-auto flex-1 flex flex-col justify-center lg:w-6/12"
        header={header}
        content={content}
        ref={cont1Ref}
      />
      {/* 右側圖片 */}
      <div className=" relative lg:h-full flex flex-1 items-center  mx-0   md:ml-5 md:mb-20 lg:mb-0">
        <div className="absolute right-5 top-0  md:top-[-20%] lg:top-0  w-6/12  md:w-5/12 lg:w-5/12   z-10 ml-10">
          <img
            src="/assets/images/About3.jpg"
            alt="placeholder"
            className=" object-cover shadow-lg"
          />
        </div>
        <div className="my-auto  w-8/12 ">
          <img
            src="/assets/images/About1.jpg"
            alt="placeholder"
            className=" object-cover mt-10 shadow-lg"
          />
        </div>
        <div className="absolute right-0  lg:right-0 bottom-[-10%] md:bottom-[-25%] lg:bottom-0 z-10     w-5/12 md:w-5/12 lg:w-4/12  ">
          <img
            src="/assets/images/About2.jpg"
            alt="placeholder"
            className=" object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
